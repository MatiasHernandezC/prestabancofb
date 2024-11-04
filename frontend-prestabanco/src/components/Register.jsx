import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import userService from "../services/user.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import "./formulario.css";

export function Register() {
  const [rut, setRut] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const [titleUserForm, setTitleUserForm] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!rut) newErrors.rut = "El RUT es obligatorio.";
    if (!name) newErrors.name = "El nombre es obligatorio.";
    if (!email) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Formato de correo electrónico inválido.";
    }
    if (!password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveUser = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const user = { rut, name, email, password, type, id };
    user.type = 0;

    if (id) {
      userService
        .update(user)
        .then((response) => {
          console.log("Usuario ha sido actualizado.", response.data);
          navigate("/user/list");
        })
        .catch((error) => {
          console.log("Error al actualizar el usuario.", error);
        });
    } else {
      userService
        .create(user)
        .then((response) => {
          console.log("Usuario ha sido añadido.", response.data);
          navigate("/user/list");
        })
        .catch((error) => {
          console.log("Error al crear el usuario.", error);
        });
    }
  };

  useEffect(() => {
    if (id) {
      setTitleUserForm("Editar Usuario");
      userService
        .get(id)
        .then((user) => {
          setRut(user.data.rut);
          setName(user.data.name);
          setEmail(user.data.email);
          setPassword(user.data.password);
          setType(1);
        })
        .catch((error) => {
          console.log("Error al cargar el usuario.", error);
        });
    } else {
      setTitleUserForm("Nuevo Usuario");
    }
  }, [id]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      component="form"
    >
      <h3>{titleUserForm}</h3>
      <hr />
      <FormControl fullWidth>
        <TextField
          id="rut"
          label="RUT"
          value={rut}
          variant="standard"
          onChange={(e) => setRut(e.target.value)}
          helperText={errors.rut || "Ej. 12345678-9"}
          error={Boolean(errors.rut)}
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          id="name"
          label="Nombre completo"
          value={name}
          variant="standard"
          onChange={(e) => setName(e.target.value)}
          helperText={errors.name || ""}
          error={Boolean(errors.name)}
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          id="email"
          label="Email"
          value={email}
          variant="standard"
          onChange={(e) => setEmail(e.target.value)}
          helperText={errors.email || "ejemplo@gmail.com"}
          error={Boolean(errors.email)}
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          id="password"
          label="Contraseña"
          value={password}
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          helperText={errors.password || ""}
          error={Boolean(errors.password)}
        />
      </FormControl>

      <FormControl>
        <Button
          variant="contained"
          color="info"
          onClick={(e) => saveUser(e)}
          style={{ marginLeft: "0.5rem" }}
          startIcon={<SaveIcon />}
        >
          Grabar
        </Button>
      </FormControl>
      <hr />
      <Link to="/home">Back to List</Link>
    </Box>
  );
}

export default Register;