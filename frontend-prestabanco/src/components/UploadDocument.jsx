import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import documentService from "../services/document.service";

function UploadDocument() {
  const [file, setFile] = useState(null);
  const [type, setType] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !type) {
      setError("Por favor completa todos los campos.");
      return;
    }

    try {
      const userId = 1;  // Aquí puedes obtener el ID del usuario logueado según tu lógica
      await documentService.uploadDocument(file, type, userId);
      alert("Documento subido con éxito");
      navigate('/home');
    } catch (error) {
      console.error("Error al subir el documento:", error);
      setError("Hubo un problema al subir el documento.");
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      gap={2}  // Espaciado entre los elementos
      sx={{ width: '100%', maxWidth: 400, mx: 'auto', p: 3, boxShadow: 3, borderRadius: 2 }}
    >
      <h3>Cargar Documento</h3>
      
      <TextField
        label="Tipo de Documento"
        value={type}
        onChange={(e) => setType(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Box width="100%" display="flex" flexDirection="column" gap={2}>
        <Button 
          variant="contained" 
          component="label" 
          startIcon={<CloudUploadIcon />} 
          fullWidth 
          sx={{ fontSize: '1rem', paddingY: 1.5 }}
        >
          Seleccionar archivo
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ fontSize: '1rem', paddingY: 1.5 }}
        >
          Subir Documento
        </Button>
      </Box>

      {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}
    </Box>
  );
}

export default UploadDocument;
