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
import { useNavigate } from "react-router-dom";

export default function Navbar({ user, logout }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleDrawer = (open) => (event) => {
    setOpen(open);
  };

  return (
    <Box sx={{display: "flex", alignItems: "center", flexGrow: 1  }}>
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
            sx={{ flexGrow: 1, fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
          >
            PrestaBanco
          </Typography>

          {user ? (
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  px: 2,
                  py: 0.5,
                  borderRadius: '4px',
                  ml: 2
                }}
              >
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 500,
                    color: 'white',
                    fontSize: '0.9rem',
                    mr: 1
                  }}
                >
                  {user.email}
                </Typography>
              </Box>
              <Button color="inherit" onClick={logout} sx={{ ml: 2 }}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
              <Button color="inherit" onClick={() => navigate("/register")}>Registrarse</Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Sidemenu open={open} toggleDrawer={toggleDrawer} user={user}></Sidemenu>
    </Box>
  );
}