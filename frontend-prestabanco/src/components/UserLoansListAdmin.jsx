import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserLoanService from "../services/userLoan.service";
import LoanService from "../services/loan.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const UserLoan = ({ user }) => {
  const [Loans, setLoans] = useState([]);
  const [UserLoan, setUserLoan] = useState([]);
  const navigate = useNavigate();

  const init = () => {
    UserLoanService.getByUserId(user.id)
      .then((response) => {
        console.log("Mostrando listado de todos los Préstamos disponibles.", response.data);
        setUserLoan(response.data);
      })
      .catch((error) => {
        console.log("Se ha producido un error al intentar mostrar listado de todos los préstamos.", error);
      });

    LoanService.getAll()
      .then((response) => {
        console.log("Mostrando listado de todos los Préstamos disponibles.", response.data);
        setLoans(response.data);
      })
      .catch((error) => {
        console.log("Se ha producido un error al intentar mostrar listado de todos los préstamos.", error);
      });
  };

  useEffect(() => {
    init();
  }, []);

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

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case 0: return "grey.300"; // Gris para "Aún no Revisada"
      case 1: return "warning.light"; // En Revisión Inicial
      case 2: return "warning.light"; // Pendiente de Documentación
      case 3: return "info.light"; // En Evaluación
      case 4: return "info.light"; // Pre-Aprobada
      case 5: return "info.light"; // En Aprobación Final
      case 6: return "success.light"; // Aprobada
      case 7: return "error.light"; // Rechazada
      case 8: return "error.light"; // Cancelada por el Cliente
      case 9: return "success.light"; // En Desembolso
      default: return "white"; // Estado Desconocido
    }
  };

  const getLoanType = (loanId) => {
    const loan = Loans.find(loan => loan.id === loanId);
    return loan ? loan.type : "Tipo Desconocido";
  };

  const handleReviewRequest = (userLoanId, status) => {
    console.log("Revisar solicitud con ID:", userLoanId);
    // Redirigir a la vista correspondiente según el estado
    switch (status) {
      case 0: // Paso a 1 / 7 por eje / 8 por cliente 
        navigate(`/review/initial/${userLoanId}`);
        break;
      case 1: // Paso a 3 / 7 por eje / 8 por cliente  
        navigate(`/review/evaluation/${userLoanId}`);
        break;
      case 2: // Paso a 3 / 7 por eje / 8 por cliente 
        navigate(`/review/evaluation/${userLoanId}`);
        break;
      case 3: // Paso a 4 / 7 por eje / 8 por cliente
        navigate(`/review/pre-approved/${userLoanId}`);
        break;
      case 4: // Paso a 5 / 7 por eje / 8 por cliente 
        navigate(`/review/final-approval/${userLoanId}`);
        break;
      case 5: // Paso a 6 / 7 por eje / 8 por cliente 
        navigate(`/review/approved/${userLoanId}`);
        break;
      case 6: // Paso a 9 / 7 por eje / 8 por cliente
        navigate(`/review/disbursed/${userLoanId}`);
        break;
      case 7: //
        console.log("Cancelado por el ejecutivo.");
        break;
      case 8: //  
        console.log("Cancelado por el cliente.");
        break;
      case 9: //  
      console.log("En desembolso.");
        break;
      default:
        console.log("Estado desconocido, no se puede redirigir.");
        break;
    }
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Tipo Préstamo
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Monto Pedido
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Cuotas Pedidas
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Mensualidad
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Seguro contra Incendios (Mensual)
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Seguro de Degravamen (Mensual)
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Costo de Administración
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Costo Total
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Estado Solicitud
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Acción
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {UserLoan.map((userLoan) => (
              <TableRow key={userLoan.id}>
                <TableCell align="left">{getLoanType(userLoan.loanId)}</TableCell>
                <TableCell align="left">{userLoan.totalLoan}</TableCell>
                <TableCell align="left">{userLoan.numberOfQuotas}</TableCell>
                <TableCell align="left">{userLoan.quota}</TableCell>
                <TableCell align="left">{userLoan.fireInsurance}</TableCell>
                <TableCell align="left">{userLoan.creditInsurance}</TableCell>
                <TableCell align="left">{userLoan.administrationCost}</TableCell>
                <TableCell align="left">{userLoan.totalCost}</TableCell>
                <TableCell 
                  align="left" 
                  sx={{ backgroundColor: getStatusBackgroundColor(userLoan.status), padding: "8px" }} 
                >
                  {getStatusText(userLoan.status)}
                </TableCell>
                <TableCell align="center">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleReviewRequest(userLoan.id, userLoan.status)}
                  >
                    Revisar Solicitud
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserLoan;
