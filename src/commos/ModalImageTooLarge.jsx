import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

function ModalImageTooLarge({ showModal, handleCloseModal }) {
  return (
    <>
      <Dialog open={showModal} onClose={handleCloseModal}>
        <DialogTitle>Image too large</DialogTitle>
        <DialogContent>
          <p>
            The image size exceeds the allowed limit of 60KB. Please select a
            smaller image
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary" autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ModalImageTooLarge;
