import { Box, Typography, Input, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { setModalState } from "../redux/modal.slice";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TemporaryDrawer from "./HamburguerMenu";

function NavbarMobile({ searchValue, handleSearch, cleanSearch }) {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

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
      id="mobilieNavbar"
      sx={{
        boxSizing: "border-box",
        margin: "0",
        padding: "0",
        width: "100vw",
        height: "10vh",
        backgroundColor: "rgba(8, 15, 40,0.6)",
        position: "fixed",
        zIndex: "10",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        onClick={handleHome}
        sx={{ marginLeft: "2%", "&:hover": { color: "#f7a102" } }}
        variant="h4"
        component="h2"
      >
        TMDB
      </Typography>
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
          placeholder="Search"
          value={searchValue}
          onChange={handleSearch}
          sx={{ outline: "none", border: "none", marginLeft: "10px" }}
        />
        <SearchIcon />
      </Box>
      <TemporaryDrawer />
    </Box>
  );
}

export default NavbarMobile;
