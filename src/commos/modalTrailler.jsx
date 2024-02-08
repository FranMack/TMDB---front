import React, { useEffect, useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import YouTube from "react-youtube";
import CloseIcon from "@mui/icons-material/Close";
import { useYoutubeSize } from "../hooks/useYoutubeSize";

function ModalTrailler({ open, videoId, close }) {
  const [medidas, setMedidas] = useState(null);

  useEffect(() => {
    const ventana = document.querySelector("#ventana");

    if (ventana && ventana.clientHeight && ventana.clientWidth) {
      const medidas = {
        ancho: ventana.clientWidth,
        alto: ventana.clientHeight,
      };

      setMedidas(medidas);
    }
  }, [open]);

  // Opciones del reproductor de YouTube
  const opts = {
    height: medidas?.alto,
    width: medidas?.ancho,
  };

  return (
    <Modal
      open={open}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          padding: "0% 1% 1% 1%",
          backgroundColor: "rgba(8, 15, 40,0.8)",
          minWidth: "60vw",
          minHeight: "80vh",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
          <CloseIcon
            sx={{ color: "white", "&:hover": { color: "red" } }}
            onClick={close}
          />
        </Box>
        <YouTube opts={opts} videoId={videoId} />
      </Box>
    </Modal>
  );
}

export default ModalTrailler;
