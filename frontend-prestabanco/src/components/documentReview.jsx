import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper, Grid, List, ListItem, ListItemText, Link } from "@mui/material";
import UserLoanService from "../services/userLoan.service";
import LoanService from "../services/loan.service";
import DocumentService from "../services/document.service";

const documentReview = () => {
  const { userLoanId } = useParams();
  const [userLoan, setUserLoan] = useState(null);
  const [loan, setLoan] = useState(null); // Estado para los detalles del préstamo
  const [documents, setDocuments] = useState([]); // Estado para los documentos
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [visibleDocumentId, setVisibleDocumentId] = useState(null);
  const [isDocumentListVisible, setIsDocumentListVisible] = useState(false); // Estado para controlar la visibilidad de la lista
  
  const toggleDocumentListVisibility = () => {
    setIsDocumentListVisible(!isDocumentListVisible); // Alterna la visibilidad de la lista
  };
    
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
        const documentsResponse = await DocumentService.getDocumentByUserId(userLoanData.userId);
        setDocuments(documentsResponse.data); // Accede a la propiedad `data`

        
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
  const getStatusText = (status) => {
    switch (status) {
      case 0: return "Aún no Revisada.";
      case 1: return "En Revisión Inicial.";
      case 2: return "Pendiente de Documentación.";
      case 3: return "En Evaluación.";
      case 4: return "Pre-Aprobada.";
      case 5: return "En Aprobación Final.";
      case 6: return "Aprobada.";
      case 7: return "Rechazada.";
      case 8: return "Cancelada por el Cliente.";
      case 9: return "En Desembolso.";
      default: return "Estado Desconocido.";
    }
  };
  const handleIncorrectDocumentation = async () => {
    try {
      await UserLoanService.updateLoanStatus(userLoan, 2);
      navigate(`/userLoan/listAll`);
    } catch (error) {
      console.error("Error al aprobar la solicitud con documentos faltantes:", error);
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
  
  const toggleDocumentVisibility = (docId) => {
    setVisibleDocumentId((prev) => (prev === docId ? null : docId)); // Muestra u oculta el documento
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
          Revisión de Documentos de la Solicitud
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
              <strong>Estado:</strong> {getStatusText(userLoan.status)}
            </Typography>
          </Grid>
        </Grid>

        {/* Lista de Documentos */}
        <Box
          sx={{
            backgroundColor: "#0d47a1", // Azul
            padding: 2,
            borderRadius: 2,
            color: "white",
            position:  "top",
            margin: "auto",
            mt: 2, // Espaciado superior
            width: "75%"
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={toggleDocumentListVisibility}
            sx={{ mb: 2 }}
          >
            {isDocumentListVisible ? "Ocultar Documentos" : "Mostrar Documentos"}
          </Button>

          {isDocumentListVisible && (
            <>
              <Typography variant="h6">Documentos del Usuario:</Typography>
              {documents.length > 0 ? (
                <List>
                  {documents.map((doc) => {
                    const fileUrl = `data:application/pdf;base64,${doc.file}`; // Cambia el MIME type si no es PDF

                    return (
                      <ListItem key={doc.id} sx={{ flexDirection: "column", alignItems: "center" }}>
                        <ListItemText primary={doc.type} />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => toggleDocumentVisibility(doc.id)}
                          sx={{ mt: 1 }}
                        >
                          {visibleDocumentId === doc.id ? "Ocultar Documento" : "Ver Documento"}
                        </Button>
                        {visibleDocumentId === doc.id && (
                          <Box
                            component="iframe"
                            src={fileUrl}
                            width="65%"
                            height="500px"
                            sx={{ border: "1px solid #ccc", mt: 2 }}
                          />
                        )}
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                <Typography>No hay documentos subidos para este usuario.</Typography>
              )}
            </>
          )}
        </Box>


        {/* Acciones */}
        <Box
          sx={{
            mt: 3,
            display: "flex", // Habilitar flexbox
            flexDirection: "column", // Disposición en columna
            alignItems: "center", // Centrar los botones
            gap: 2, // Espacio entre los botones
          }}
        >
          <Typography variant="h6">Acciones:</Typography>
          <Button
            variant="contained"
            color="success"
            onClick={handleApproveDocumentation}
            sx={{ width: "50%" }} 
          >
            Pasar Solicitud a evaluación
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handleIncorrectDocumentation}
            sx={{ width: "50%" }} 
          >
            Faltan Documentos o hay Documentos Incorrectos
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleReject}
            sx={{ width: "50%" }} 
          >
            Rechazar Solicitud
          </Button>
        </Box>

      </Paper>
    </Box>
  );
};

export default documentReview;
