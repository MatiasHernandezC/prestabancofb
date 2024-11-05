import { Accordion, AccordionSummary, AccordionDetails, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material"; 
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoanService from "../services/loan.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const LoanList = ({user}) => {
  const [Loans, setLoans] = useState([]);
  const [requirements, setRequirements] = useState({});
  const [loanName, setLoanName] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [years, setYears] = useState("");
  const [interest, setInterest] = useState("");
  const [userRut, setUserRut] = useState("");
  const [simulationResult, setSimulationResult] = useState(null);
  const [insuranceDetails, setInsuranceDetails] = useState(null); 
  const navigate = useNavigate();
  const init = () => {
    LoanService.getAll()
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

  const handleRequirements = (loanName) => {
    LoanService.getRequirements(loanName)
      .then((response) => {
        setRequirements((prev) => ({ ...prev, [loanName]: response.data }));
      })
      .catch((error) => {
        console.error("Error al mostrar documentos requeridos", error);
      });
  };

  const simulateLoan = () => {
    LoanService.simulateLoan(loanName, loanAmount, years, interest, user.rut)
      .then((response) => {
        setSimulationResult(response.data);
        const seguroDegravamen = loanAmount * 0.0003;
        const seguroIncendio = 20000;
        const comisionAdministracion = loanAmount * 0.01;

        // Costo mensual total
        const costoMensualTotal = response.data + seguroDegravamen + seguroIncendio;

        // Costo total considerando el plazo
        const costoTotal = (costoMensualTotal * years * 12) + comisionAdministracion;

        // Guardamos los detalles de seguros y costos
        setInsuranceDetails({
          seguroDegravamen,
          seguroIncendio,
          comisionAdministracion,
          costoMensualTotal,
          costoTotal
        });
      })
      .catch((error) => {
        console.error("Error al simular el préstamo", error);
      });
  };

  return (
    <Box>
      <TableContainer component={Paper}>
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
                Monto Máximo Financiamiento
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Tasa Interés (Anual) Mínimo
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Tasa Interés (Anual) Máximo
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Documentos Requeridos
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Loans.map((Loan) => (
              <TableRow key={Loan.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="left">{Loan.type}</TableCell>
                <TableCell align="left">{Loan.maxTerm} años</TableCell>
                <TableCell align="right">{Loan.maxAmount}% del valor de la propiedad</TableCell>
                <TableCell align="right">{Loan.minInterest}%</TableCell>
                <TableCell align="right">{Loan.maxInterest}%</TableCell>
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

      <Box sx={{ p: 2, mt: 3 }}>
        <Typography variant="h5" gutterBottom>Simular un Préstamo</Typography>
        
        <FormControl fullWidth margin="normal">
          <InputLabel id="loan-select-label">Nombre del Préstamo</InputLabel>
          <Select
            labelId="loan-select-label"
            value={loanName}
            onChange={(e) => setLoanName(e.target.value)}
            label="Nombre del Préstamo"
          >
            {Loans.map((Loan) => (
              <MenuItem key={Loan.id} value={Loan.type} >{Loan.type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Monto del Préstamo"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          type="number"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Años de Financiamiento"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          type="number"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tasa de Interés (%)"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          type="number"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={simulateLoan} sx={{ mt: 2 }}>
          Simular Préstamo
        </Button>

        <Box sx={{ mt: 2, p: 2, border: '1px solid', borderColor: simulationResult !== null && simulationResult !== 0 ? 'secondary.main' : 'error.main', borderRadius: 1, bgcolor: simulationResult !== null && simulationResult !== 0 ? 'rgba(100, 255, 218, 0.1)' : 'rgba(255, 0, 0, 0.1)' }}>
        {simulationResult !== null && simulationResult !== 0 && insuranceDetails.costoMensualTotal >= 0 && insuranceDetails.costoTotal >= 0? (
          <>
          <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold' }}>
            Pago Mensual de Préstamo: <span style={{ color: 'green' }}>${simulationResult}</span> mensual por {years * 12} meses
          </Typography>
          {insuranceDetails && (
            <>
              <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold' }}>Seguro de Degravamen: <span style={{ color: 'green' }}>${insuranceDetails.seguroDegravamen.toFixed(2)}</span></Typography>
              <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold' }}>Seguro de Incendio: <span style={{ color: 'green' }}>${insuranceDetails.seguroIncendio}</span> por mes</Typography>
              <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold' }}>Comisión de Administración: <span style={{ color: 'green' }}>${insuranceDetails.comisionAdministracion.toFixed(2)}</span></Typography>
              <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold' }}>Costo Mensual Total: <span style={{ color: 'green' }}>${insuranceDetails.costoMensualTotal.toFixed(2)}</span></Typography>
              <Typography variant="h6" color="secondary" sx={{ fontWeight: 'bold' }}>Costo Total: <span style={{ color: 'green' }}>${insuranceDetails.costoTotal.toFixed(2)}</span></Typography>
            </>
          )}
          </>
        ) : (
          <Typography variant="h6" color="error" sx={{ fontWeight: 'bold' }}>
            Error al simular, revise que los datos esten correctos y que no le falten documentos
          </Typography>
        )}
      </Box>
      </Box>
    </Box>
  );
};

export default LoanList;