import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/user.service";
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

const UserList = () => {
  const [Users, setUsers] = useState([]);

  const navigate = useNavigate();

  const init = () => {
    UserService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todos los usuarios.", response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todos los usuarios.",
          error
        );
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handleDelete = (id) => {
    console.log("Printing id", id);
    const confirmDelete = window.confirm(
      "¿Esta seguro que desea borrar este usuario?"
    );
    if (confirmDelete) {
      UserService
        .remove(id)
        .then((response) => {
          console.log("usuario ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar al usuario",
            error
          );
        });
    }
  };

  const handleEdit = (id) => {
    console.log("Printing id", id);
    navigate(`/User/edit/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <br />
      <Link
        to="/User/add"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
        >
          Añadir usuario
        </Button>
      </Link>
      <br /> <br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Rut
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Nombre
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Email
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Password
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Tipo
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Operaciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Users.map((User) => (
            <TableRow
              key={User.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{User.rut}</TableCell>
              <TableCell align="left">{User.name}</TableCell>
              <TableCell align="right">{User.email}</TableCell>
              <TableCell align="right">{User.password}</TableCell>
              <TableCell align="right">{User.type === 1 ? "Admin" : "Cliente"}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => handleEdit(User.id)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<EditIcon />}
                >
                  Editar
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(User.id)}
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<DeleteIcon />}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
