import React from "react";
import { useSelector, useDispatch } from "react-redux";
import modalConfirm, { setModalConfirmState } from "../redux/modalConfirm";

import { Modal, Box, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ModalConfirm({ handleDeleteFavorite }) {
  const dispatch = useDispatch();
  const movieId = useSelector((state) => state.modalConfirm.movieId);

  const handleModalConfirm = () => {
    dispatch(setModalConfirmState({ modalOpen: false }));
  };

  const modalOpen = useSelector((state) => state.modalConfirm.modalOpen);
  return (
    <Modal
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      open={modalOpen}
    >
      <Box
        sx={{
          backgroundColor: "#080f28",
          width: "30vw",
          height: "50vh",
          display: "flex",
          borderRadius: "5%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
          <CloseIcon
            onClick={handleModalConfirm}
            sx={{
              color: "white",
              marginTop: "1%",
              marginRight: "2%",
              "&:hover": { color: "red" },
            }}
          />
        </Box>
        <Typography variant="h6" sx={{ margin: "5% 0", color: "white" }}>
          Esta seguro que desea eliminar de favoritos?
        </Typography>
        <Box
          sx={{
            marginBottom: "20%",
            width: "70%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            onClick={() => {
              handleDeleteFavorite(movieId);
              handleModalConfirm();
            }}
            sx={{ padding: "3%", color: "white", backgroundColor: "#ea0505" }}
          >
            SI
          </Button>
          <Button
            onClick={handleModalConfirm}
            sx={{ padding: "3%", color: "white", backgroundColor: "#ea0505" }}
          >
            NO
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ModalConfirm;
