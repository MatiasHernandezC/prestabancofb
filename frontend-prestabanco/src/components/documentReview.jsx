import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper, Grid, List, ListItem, ListItemText, Link } from "@mui/material";
import UserLoanService from "../services/userLoan.service";
import LoanService from "../services/loan.service";
import DocumentService from "../services/document.service";

const InitialReview = () => {
  const { userLoanId } = useParams();
  const [userLoan, setUserLoan] = useState(null);
  const [loan, setLoan] = useState(null); // Estado para los detalles del préstamo
  const [documents, setDocuments] = useState([]); // Estado para los documentos
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener detalles de la solicitud de préstamo
        const userLoanResponse = await UserLoanService.get(userLoanId);
        const userLoanData = userLoanResponse.data;
        setUserLoan(userLoanData);

        // Obtener detalles del préstamo por loanId
        const loanResponse = await LoanService.get(userLoanData.loanId);
        setLoan(loanResponse.data);

        // Obtener documentos del usuario
        const documentsResponse = await DocumentService.getAllDocuments();
        const userDocuments = documentsResponse.data.filter(doc => doc.userId === userLoanData.userId);
        setDocuments(userDocuments);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userLoanId]);

  const handleApproveDocumentation = async () => {
    try {
      await UserLoanService.updateLoanStatus(userLoan, 3);
      navigate(`/userLoan/listAll`);
    } catch (error) {
      console.error("Error al aprobar la solicitud:", error);
    }
  };

  const handleIncorrectDocumentation = async () => {
    try {
      await UserLoanService.updateLoanStatus(userLoan, 2);
      navigate(`/userLoan/listAll`);
    } catch (error) {
      console.error("Error al aprobar la solicitud:", error);
    }
  };

  const handleReject = async () => {
    try {
      await UserLoanService.updateLoanStatus(userLoan, 7);
      navigate(`/userLoan/listAll`);
    } catch (error) {
      console.error("Error al rechazar la solicitud:", error);
    }
  };

  if (loading) {
    return <Typography variant="h6">Cargando...</Typography>;
  }

  if (!userLoan) {
    return <Typography variant="h6">Solicitud no encontrada.</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Revisión Inicial de Solicitud
        </Typography>
        <Typography variant="h6">Detalles de la Solicitud:</Typography>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} textAlign="center">
            <Typography>
              <strong>Tipo de Préstamo:</strong> {loan ? loan.type : "Cargando..."}
            </Typography>
            <Typography>
              <strong>Monto Solicitado:</strong> ${userLoan.totalLoan}
            </Typography>
            <Typography>
              <strong>Estado:</strong> En Revisión Inicial
            </Typography>
          </Grid>
        </Grid>

        {/* Lista de Documentos */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Documentos del Usuario:</Typography>
          {documents.length > 0 ? (
            <List>
              {documents.map(doc => (
                <ListItem key={doc.id}>
                  <ListItemText primary={doc.type} />
                  <Link href={`/api/v1/documents/${doc.id}`} target="_blank" rel="noopener">
                    Ver Documento
                  </Link>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No hay documentos subidos para este usuario.</Typography>
          )}
        </Box>

        {/* Acciones */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Acciones:</Typography>
          <Button
            variant="contained"
            color="success"
            onClick={handleApproveDocumentation}
            sx={{ mr: 2 }}
          >
            Pasar Solicitud a Documentación Correcta
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleIncorrectDocumentation}
            sx={{ mr: 2 }}
          >
            Pasar Solicitud a Documentación Incorrecta
          </Button>
          <Button variant="contained" color="error" onClick={handleReject}>
            Rechazar Solicitud
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default InitialReview;
