import React from "react";
import { Box, Typography, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Footer() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "12vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderTop: "solid 1px white",
        fontFamily: "monospace",
        fontSize: "1.05rem",
      }}
    >
      <p>2023 - Francisco Mackinnon - Todos los derechos reservados</p>
    </Box>
  );
}

export default Footer;
