import React, { useEffect } from "react";
import { Box, Typography, Input, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { setModalState } from "../redux/modal.slice";
import DropDown from "./dropDown";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar({
  searchValue,
  handleSearch,
  cleanSearch,
}) {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const handleModal = () => {
    dispatch(setModalState({ modalOpen: !modal.modalOpen }));
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHome = () => {
    cleanSearch();
    navigate("/");
  };

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        margin: "0",
        padding: "0",
        width: "100%",
        height: "10vh",
        backgroundColor: "rgba(8, 15, 40,0.6)",
        position: "fixed",
        zIndex: "10",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: "3%",
          color: "white",
        }}
      >
        <Typography
          onClick={handleHome}
          sx={{ marginRight: "10%", "&:hover": { color: "#f7a102" } }}
          variant="h4"
          component="h2"
        >
          TMDB
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "50%",
          justifyContent: "start",
          alignItems: "center",
          marginLeft: "3%",
          color: "white",
        }}
      >
     
        <Typography
        onClick={handleHome}
          variant="h5"
          component="h2"
          sx={{ marginRight: "5%", "&:hover": { color: "#f7a102" } }}
        >
          Peliculas
        </Typography>
        <Link style={{textDecoration:"none",color: "inherit"  }} to="tv">
        <Typography
          variant="h5"
          component="h2"
          sx={{ marginRight: "5%", "&:hover": { color: "#f7a102" }}}
        >
          Series
        </Typography>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          marginRight: "3%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            border: "1px solid gray",
            borderTopLeftRadius: "15px",
            borderBottomLeftRadius: "15px",
            borderTopRightRadius: "15px",
            borderBottomRightRadius: "15px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ffff",
            paddingInline: "0.6%",
          }}
        >
          <Input
            disableUnderline
            placeholder="Buscar"
            value={searchValue}
            onChange={handleSearch}
            sx={{ outline: "none", border: "none", marginLeft: "10px" }}
          />
          <SearchIcon />
        </Box>

        <DropDown
          open={open}
          handleClick={handleClick}
          handleClose={handleClose}
          anchorEl={anchorEl}
        />

        {user.email && user.url_img ? (
          <Avatar
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            src={user.url_img}
            sx={{ marginLeft: "5%" }}
          ></Avatar>
        ) : user.email ? (
          <Avatar
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ marginLeft: "5%" }}
          >{`${user.name[0]}`}</Avatar>
        ) : (
          <Avatar
            sx={{
              marginLeft: "5%",
              backgroundColor: "#080f28",
              "&:hover": { color: "#f7a102" },
            }}
            onClick={handleModal}
          ></Avatar>
        )}
      </Box>
    </Box>
  );
}

export default Navbar;
