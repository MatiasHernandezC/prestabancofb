import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Sidemenu from "./Sidemenu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, logout }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleDrawer = (open) => (event) => {
    setOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 2, fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
          >
            PrestaBanco
          </Typography>

          {user ? (
            <>
              <Typography
                variant="h10"
                component="div"
                sx={{ flexGrow: 2, fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
              >
               Email usuario: {user.email}
              </Typography>
              <Button color="inherit" onClick={logout}>Logout</Button>
              <Button color="inherit" onClick={() => navigate("/loans/list")}>Préstamos</Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
              <Button color="inherit" onClick={() => navigate("/register")}>Registrarse</Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Sidemenu open={open} toggleDrawer={toggleDrawer}></Sidemenu>
    </Box>
  );
}