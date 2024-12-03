import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper, Grid, List, ListItem, ListItemText, Link, TextField } from "@mui/material";
import UserLoanService from "../services/userLoan.service";
import LoanService from "../services/loan.service";
import DocumentService from "../services/document.service";
import { Checkbox, FormControlLabel, Divider } from "@mui/material";

const evaluation = () => {
  const { userLoanId } = useParams();
  const [userLoan, setUserLoan] = useState(null);
  const [loan, setLoan] = useState(null); // Estado para los detalles del préstamo
  const [documents, setDocuments] = useState([]); // Estado para los documentos
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [visibleDocumentId, setVisibleDocumentId] = useState(null);
  const [isDocumentListVisible, setIsDocumentListVisible] = useState(false); // Estado para controlar la visibilidad de la lista
  const [userIncome, setUserIncome] = useState(0);
  const [userDeudas, setUserDeudas] = useState(0);
  const [deudaRatio, setDeudaRatio] = useState(null);
  const [quotaIncomeRatio, setQuotaIncomeRatio] = useState(null);
  const [checkedDocuments, setCheckedDocuments] = useState({});
  const [isEmployed, setIsEmployed] = useState(false); // Estado para tipo de empleo
  const [employmentDuration, setEmploymentDuration] = useState(""); // Años de antigüedad laboral
  const [isStabilityVerified, setIsStabilityVerified] = useState(false);

  // Manejador para verificar estabilidad
  const handleStabilityCheck = () => {
    if (isEmployed && employmentDuration >= 1) {
      setIsStabilityVerified(true); // Cumple estabilidad laboral
    } else if (!isEmployed && employmentDuration >= 2) {
      setIsStabilityVerified(true); // Cumple estabilidad financiera como independiente
    } else {
      setIsStabilityVerified(false);
      alert("El cliente no cumple con los criterios de estabilidad laboral o financiera.");
    }
  };

  const handleDocumentCheck = (docId) => {
    setCheckedDocuments((prev) => ({
      ...prev,
      [docId]: !prev[docId], // Alternar el estado de marcado del documento
    }));
  };
  const toggleDocumentListVisibility = () => {
    setIsDocumentListVisible(!isDocumentListVisible); // Alterna la visibilidad de la lista
  };

  const handleCalculateQuotaIncome = () => {
    if (userIncome > 0) {
      const ratio = Math.floor((userLoan.quota / userIncome) * 100);
      setQuotaIncomeRatio(ratio);
    } else {
      setQuotaIncomeRatio(null);
      alert("Por favor, ingrese un valor válido para el ingreso.");
    }
  };
  const handleCalculateDeudas = () => {
    if (userIncome > 0) {
      const ratio = (((userLoan.quota + userDeudas)*100)/userIncome);
      setDeudaRatio(ratio);
    } else {
      setDeudaRatio(null);
      alert("Por favor, ingrese un valor válido para el total de deudas.");
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
      await UserLoanService.updateLoanStatus(userLoan, 4);
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
          Evaluación de la solicitud
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
              <strong>Monto Total de prestamo:</strong> ${userLoan.totalCost}
            </Typography>
            <Typography>
              <strong>Mensualidad a pagar:</strong> ${userLoan.quota}
            </Typography>
            <Typography>
              <strong>Cantidad de meses:</strong> {userLoan.numberOfQuotas} meses
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

        <Box>
    
        <Box // Calculo Relación Cuota/Ingreso
          sx={{
            position: "relative",
            margin: "auto",
            mt: 2, // Espaciado superior
            width: "50%",
            p: 2,
            backgroundColor: "#f0f0f0",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">Calcular Relación Cuota/Ingreso</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2, // Espacio entre los elementos
              mt: 2, // Espaciado superior
            }}
          >
            <TextField
              type="number"
              value={userIncome}
              onChange={(e) => setUserIncome(Number(e.target.value))}
              helperText="Ingrese el ingreso del usuario"
              sx={{
                flexGrow: 1, 
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                flexGrow: 1, 
              }}
              onClick={handleCalculateQuotaIncome}
            >
              Calcular
            </Button>
          </Box>
          {(quotaIncomeRatio !== null && quotaIncomeRatio > 35) || quotaIncomeRatio == null ?(
            <Typography variant="body1" sx={{ mt: 2, backgroundColor:"orange"}}>
              <strong>Relación Cuota/Ingreso:</strong> {quotaIncomeRatio}% <strong> no cumple limite de 35%</strong>
            </Typography>
          ):(<Typography variant="body1" sx={{ mt: 2, backgroundColor:"lime"}}>
            <strong>Relación Cuota/Ingreso:</strong> {quotaIncomeRatio}% <strong> menor a 35%, considerar aprovación</strong>
          </Typography>)}
        </Box>

        <Box  // Comprobación de documentos
          sx={{
            position: "relative",
            margin: "auto",
            mt: 2, // Espaciado superior
            width: "50%",
            p: 2,
            backgroundColor: "#e3f2fd", // Fondo azul claro
            borderRadius: 2
          }}
        >
          <Typography variant="h6" gutterBottom>
            Lista para comprobación de documentos
          </Typography>

          {documents.length > 0 ? (
            <List>
              {documents.map((doc) => (
                <ListItem
                  key={doc.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: 1,
                    mb: 1,
                    p: 1,
                    width: "100%"
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!checkedDocuments[doc.id]}
                        onChange={() => handleDocumentCheck(doc.id)}
                        color="primary"
                      />
                    }
                    label={doc.type} // Mostrar el tipo de documento
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No hay documentos disponibles para evaluar.</Typography>
          )}
        </Box>

        <Box // Evaluación de Estabilidad Laboral y Financiera
          sx={{
            position: "relative",
            margin: "auto",
            mt: 2, // Espaciado superior
            width: "50%",
            p: 2,
            backgroundColor: "#f5f5f5", // Fondo gris claro
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Evaluación de Estabilidad Laboral y Financiera
          </Typography>

          {/* Verificar tipo de empleo */}
          <FormControlLabel
            control={
              <Checkbox
                checked={isEmployed}
                onChange={(e) => setIsEmployed(e.target.checked)}
                color="primary"
              />
            }
            label="El cliente es empleado (no independiente)"
          />

          {/* Ingresar años de antigüedad */}
          <Box sx={{ mt: 2 }}>
            <TextField
              type="number"
              value={employmentDuration}
              onChange={(e) => setEmploymentDuration(Number(e.target.value))}
              label="Años de antigüedad en empleo o de ingresos constantes"
              helperText={isEmployed 
                ? "Requiere al menos 1 año de antigüedad laboral." 
                : "Requiere al menos 2 años de ingresos como independiente."}
              sx={{ width: "100%" }}
            />
          </Box>

          {/* Verificar cumplimiento */}
          <Button
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
            onClick={handleStabilityCheck}
          >
            Verificar Estabilidad
          </Button>

          {/* Resultado */}
          {isStabilityVerified ? (
            <Typography sx={{ mt: 2, color: "green" }}>
              ✅ El cliente cumple con los criterios de estabilidad.
            </Typography>
          ) : (
            employmentDuration !== "" && (
              <Typography sx={{ mt: 2, color: "red" }}>
                ❌ El cliente no cumple con los criterios de estabilidad.
              </Typography>
            )
          )}
        </Box>
        
        <Box // Calculo Relación Deuda/Ingreso
          sx={{
            position: "relative",
            margin: "auto",
            mt: 2, // Espaciado superior
            width: "50%",
            p: 2,
            backgroundColor: "#f0f0f0",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">Calcular Relación Deuda/Ingreso</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2, // Espacio entre los elementos
              mt: 2, // Espaciado superior
            }}
          >
            <TextField
              type="number"
              value={userDeudas}
              onChange={(e) => setUserDeudas(Number(e.target.value))}
              helperText="Ingrese el total de otras mensualidades del usuario"
              sx={{
                flexGrow: 1, 
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                flexGrow: 1, 
              }}
              onClick={handleCalculateDeudas}
            >
              Calcular
            </Button>
          </Box>
          {(deudaRatio !== null && deudaRatio > 50) || deudaRatio == null ?(
            <Typography variant="body1" sx={{ mt: 2, backgroundColor:"orange"}}>
              <strong>Relación Deuda/Ingreso:</strong> {deudaRatio}% <strong> supera el 50% establecido</strong>
            </Typography>
          ):(<Typography variant="body1" sx={{ mt: 2, backgroundColor:"lime"}}>
            <strong>Relación Deuda/Ingreso:</strong> {deudaRatio}% <strong> no supera el 50% establecido</strong>
          </Typography>)}
        </Box>

        Monto Máximo de Financiamiento

        Edad del Solicitante

        Capacidad de Ahorro
          Saldo Mínimo Requerido
          Historial de Ahorro Consistente
          Depósitos Periódicos
          Relación Saldo/Años de Antigüedad
          Retiros Recientes

        Resultado de la Evaluación
            • Aprobación: Si el cliente cumple con las 5 reglas, marcar la capacidad de
            ahorro como “sólida” y continuar con la evaluación del crédito.
            • Revisión Adicional: Si el cliente cumple con 3 o 4 de las 5 reglas, marcar la
            capacidad de ahorro como "moderada" e indicar que se requiere una
            revisión adicional.
            • Rechazo: Si el cliente cumple con menos de 2 reglas, marcar la capacidad
            de ahorro como “insuficiente” y proceder a rechazar.
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
            Pasar Solicitud a Documentación Correcta
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handleIncorrectDocumentation}
            sx={{ width: "50%" }}
          >
            Pasar Solicitud a Documentación Incorrecta
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

export default evaluation;
