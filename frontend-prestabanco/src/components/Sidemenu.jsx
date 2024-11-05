import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PaidIcon from "@mui/icons-material/Paid";
import CalculateIcon from "@mui/icons-material/Calculate";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AnalyticsIcon from "@mui/icons-material/Analytics";
import DiscountIcon from "@mui/icons-material/Discount";
import HailIcon from "@mui/icons-material/Hail";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import HomeIcon from "@mui/icons-material/Home";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function Sidemenu({ open, toggleDrawer, user }) {
  const navigate = useNavigate();

  const listOptions = () => (
    <Box role="presentation" onClick={toggleDrawer(false)}>
      {user?.type === 1 && (
        <>
          <Divider textAlign="center">
            <Typography variant="subtitle1">Admin Mode</Typography>
          </Divider>
          <ListItemButton onClick={() => navigate("/user/list")}>
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
          <Divider />
        </>
      )}
      
      <List>
        <ListItemButton onClick={(user) => navigate("/home")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton onClick={({user}) => navigate("/loans/list")}>
          <ListItemIcon>
            <CalculateIcon />
          </ListItemIcon>
          <ListItemText primary="Simular un Préstamo" />
        </ListItemButton>

        <ListItemButton onClick={({user}) => navigate("/userLoan/request")}>
          <ListItemIcon>
            <PaidIcon />
          </ListItemIcon>
          <ListItemText primary="Solicitar un Préstamo" />
        </ListItemButton>

        <ListItemButton onClick={({user}) => navigate("/user/view")}>
          <ListItemIcon>
            <PeopleAltIcon />
          </ListItemIcon>
          <ListItemText primary="Ver Perfil" />
        </ListItemButton>

        <ListItemButton onClick={({user}) => navigate("/uploadDocument")}>
          <ListItemIcon>
            <FileUploadIcon />
          </ListItemIcon>
          <ListItemText primary="Subir Archivos" />
        </ListItemButton>
      </List>

      <List>
        <ListItemButton onClick={() => navigate("/userLoan/view")}>
          <ListItemIcon>
            <PaidIcon />
          </ListItemIcon>
          <ListItemText primary="Ver Estado Solicitudes" />
        </ListItemButton>

      <Divider />
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {listOptions()}
      </Drawer>
    </div>
  );
}