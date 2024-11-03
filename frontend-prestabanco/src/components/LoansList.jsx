import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoanService from "../services/loan.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const LoanList = () => {
  const [Loans, setLoans] = useState([]);
  const [requirements, setRequirements] = useState({});
  const navigate = useNavigate();

  const init = () => {
    LoanService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todos los Préstamos disponibles.", response.data);
        setLoans(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todos los préstamos.",
          error
        );
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handleEdit = (id) => {
    console.log("Printing id", id);
    navigate(`/loans/edit/${id}`);
  };

  const handleRequirements = (loanName) => {
    LoanService.getRequirements(loanName)
      .then((response) => {
        setRequirements((prev) => ({ ...prev, [loanName]: response.data }));
      })
      .catch((error) => {
        console.error("Error al mostrar documentos requeridos", error);
      });
  };

  return (
    <TableContainer component={Paper}>
      <br />
      
      <br /> <br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Tipo
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Plazo Máximo
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Cantidad Máxima
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Interés Mínimo
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Interés Máximo
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Documentos Requeridos
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Loans.map((Loan) => (
            <TableRow
              key={Loan.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{Loan.type}</TableCell>
              <TableCell align="left">{Loan.maxTerm}</TableCell>
              <TableCell align="right">{Loan.maxAmount}</TableCell>
              <TableCell align="right">{Loan.minInterest}</TableCell>
              <TableCell align="right">{Loan.maxInterest}</TableCell>
              <TableCell>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => handleRequirements(Loan.type)}>
                  <Typography>Ver Documentos</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul>
                    {requirements[Loan.type]?.map((doc, index) => (
                      <li key={index}>{doc}</li>
                    )) || <Typography>No hay documentos.</Typography>}
                  </ul>
                </AccordionDetails>
              </Accordion>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LoanList;
