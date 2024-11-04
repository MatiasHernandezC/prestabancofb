import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import userService from "../services/user.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";

const AddEditUser = () => {
  const [rut, setRut] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const { id } = useParams();
  const [titleUserForm, setTitleUserForm] = useState("");
  const navigate = useNavigate();

  const saveUser = (e) => {
    e.preventDefault();

    const user = { rut, name, email, password, type, id };
    if (id) {
      //Actualizar Datos user
      userService
        .update(user)
        .then((response) => {
          console.log("User ha sido actualizado.", response.data);
          navigate("/user/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar actualizar datos del User.",
            error
          );
        });
    } else {
      //Crear nuevo user
      userService
        .create(user)
        .then((response) => {
          console.log("User ha sido añadido.", response.data);
          navigate("/user/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar crear nuevo User.",
            error
          );
        });
    }
  };

  useEffect(() => {
    if (id) {
      setTitleUserForm("Editar User");
      userService
        .get(id)
        .then((user) => {
          setRut(user.data.rut);
          setName(user.data.name);
          setEmail(user.data.email);
          setPassword(user.data.password);
          setType(user.data.type)
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
        });
    } else {
      setTitleUserForm("Nuevo User");
    }
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      component="form"
    >
      <h3> {titleUserForm} </h3>
      <hr />
      <form>
        <FormControl fullWidth>
          <TextField
            id="rut"
            label="RUT"
            value={rut}
            variant="standard"
            onChange={(e) => setRut(e.target.value)}
            helperText="Ej. 12345678-9"
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="name"
            label="Nombre completo"
            value={name}
            variant="standard"
            onChange={(e) => setName(e.target.value)}
            helperText="Nombre1 Nombre2... Apellido1 Apellido2"
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="email"
            label="Email"
            value={email}
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
            helperText="ejemplo@gmail.com"
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
            helperText= "Mínimo 6 caracteres"
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            id="type"
            label="1:Admin, 0:Usuario"
            value={type}
            variant="standard"
            onChange={(e) => setType(e.target.value)}
            helperText="Tipo de usuario"
          />
        </FormControl>
        <FormControl>
          <br />
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
      </form>
      <hr />
      <Link to="/user/list">Back to List</Link>
    </Box>
  );
};

export default AddEditUser;
