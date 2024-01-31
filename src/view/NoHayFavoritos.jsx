import React from "react";
import { Box, Button, Typography } from '@mui/material';
import { Link } from "react-router-dom";

const NoHayFavoritos=()=>{

    return(
        <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: "#080f28",
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
       No hay favoritos
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }}>
        Aun no ha agregado peliculas/series a favoritos.
      </Typography>
      <Button variant="outlined" component={Link} to="/" sx={{
        marginTop:"3%",
        borderRadius: "50px",
        textTransform: "none",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
        color: "#000000",
        border: "2px solid #808080",
        padding: "5px 100px",
        backgroundColor:"white"
      }}>BACK HOME</Button>
    </Box>
    )

}

export default NoHayFavoritos;