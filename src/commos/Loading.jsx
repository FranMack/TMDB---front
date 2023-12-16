import React from "react";
import { CircularProgress, Box, colors } from "@mui/material";

function Loading() {
  return (
    <Box
      sx={{
        backgroundColor: "#080f28",
        color: "white",
        height: "100vh",
        width: "100vw",
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <Box sx={{height:"20vh"}}>
      <CircularProgress size={100} style={{color:"#ea0505",marginBottom:"20%"}} />
        <h2 style={{fontFamily:"sans-serif"}}>Loading</h2>
        </Box>
    </Box>
  );
}

export default Loading;
