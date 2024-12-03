import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper, Grid } from "@mui/material";
import UserLoanService from "../services/userLoan.service";
import LoanService from "../services/loan.service";

const InitialReview = () => {
  const { userLoanId } = useParams();
  const [userLoan, setUserLoan] = useState(null);
  const [loan, setLoan] = useState(null); // Estado para los detalles del préstamo
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
      } catch (error) {
        console.error("Error al cargar la solicitud o el tipo de préstamo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userLoanId]);

  const handleApprove = async () => {
    try {
      await UserLoanService.updateLoanStatus(userLoan, 1);
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
              <strong>Estado:</strong> {getStatusText(userLoan.status)}
            </Typography>
          </Grid>
        </Grid>

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
            onClick={handleApprove}
            sx={{ width: "50%" }}
          >
            Pasar Solicitud a Iniciar Revisión
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

export default InitialReview;
