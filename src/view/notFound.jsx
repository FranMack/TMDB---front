import React from "react";
import { Box, Button, Typography } from '@mui/material';
import { Link } from "react-router-dom";

const NotFound=()=>{

    return(
        <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: "#bed733",
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
        404
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }}>
        The page you’re looking for doesn’t exist.
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

export default NotFound;