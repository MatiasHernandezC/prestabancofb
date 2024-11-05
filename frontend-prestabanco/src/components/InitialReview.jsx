import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper, Grid } from "@mui/material";
import UserLoanService from "../services/userLoan.service";

const InitialReview = () => {
  const { userLoanId } = useParams();
  const [userLoan, setUserLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserLoan = async () => {
      try {
        const response = await UserLoanService.getByUserId(userLoanId);
        setUserLoan(response.data);
      } catch (error) {
        console.error("Error al cargar la solicitud:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserLoan();
  }, [userLoanId]);

  const handleApprove = async () => {
    try {
      await UserLoanService.updateLoanStatus(userLoanId, 1);
      
  
      navigate(`/userLoan/listAll`);
    } catch (error) {
      console.error("Error al aprobar la solicitud:", error);
    }
  };
  const handleDocument = async () => {
    try {
      await UserLoanService.updateLoanStatus(userLoanId, 2);
      
  
      navigate(`/userLoan/listAll`);
    } catch (error) {
      console.error("Error al aprobar la solicitud:", error);
    }
  };
  const handleReject = async () => {
    try {
      // Aquí estamos enviando el ID del préstamo y un estado de rechazo (por ejemplo, 7)
      await UserLoanService.updateLoanStatus(userLoanId, 7);
      
      // Actualiza el estado local si es necesario
      setUserLoan((prev) => ({ ...prev, status: 'Rechazado', code: 7 })); 
  
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Tipo de Préstamo:</strong> {userLoan.loanType}</Typography>
            <Typography><strong>Monto Solicitado:</strong> ${userLoan.amountRequested}</Typography>
            <Typography><strong>Estado:</strong> En Revisión Inicial</Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Acciones:</Typography>
          <Button variant="contained" color="success" onClick={handleApprove} sx={{ mr: 2 }}>
            Pasar Solicitud a Siguiente Estado
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
