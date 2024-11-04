import { Typography, Box, Link } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      <Typography 
        variant="h3" 
        component="h1" 
        sx={{ fontWeight: "bold", mb: 2, fontFamily: 'Poppins, sans-serif', color: "#1a73e8" }}
      >
        PrestaBanco
      </Typography>
      <Typography 
        variant="h5" 
        component="h2" 
        sx={{ fontStyle: "italic", mb: 4, color: "#5f6368" }}
      >
        App Web dedicada a préstamos hipotecarios
      </Typography>
      <Typography 
        variant="body1" 
        component="p" 
        sx={{ fontSize: "1.1rem", lineHeight: 1.6, color: "#3c4043", maxWidth: "800px", mx: "auto" }}
      >
        La aplicación web de <strong>PrestaBanco</strong> permite a sus clientes solicitar y simular préstamos hipotecarios de una manera más rápida que de forma presencial. Esta aplicación ha sido desarrollada utilizando tecnologías avanzadas como 
        {" "}
        <Link href="https://spring.io/projects/spring-boot" target="_blank" color="primary" underline="hover">
          Spring Boot
        </Link> {" "}
        (para el backend), 
        {" "}
        <Link href="https://reactjs.org/" target="_blank" color="primary" underline="hover">
          React
        </Link> {" "}
        (para el frontend), y 
        {" "}
        <Link href="https://www.mysql.com/products/community/" target="_blank" color="primary" underline="hover">
          MySQL
        </Link> {" "}
        (para la base de datos).
      </Typography>
    </Box>
  );
};

export default Home;