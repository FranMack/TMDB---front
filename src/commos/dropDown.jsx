import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user.slice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function DropDown({ open, anchorEl, handleClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location=useLocation().pathname.slice(1)

  const handleLogout = () => {
    axios
      .post(
        "http://localhost:3000/api/user/logout",
        { token: "token" },
        { withCredentials: true }
      )
      .then(() => {
        dispatch(setUser({}));
        handleClose();
        if(location==="favorites"){
          navigate("/")
        }
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFavorites = () => {
    navigate("/favorites");
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem onClick={handleFavorites}>Favorites</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );
}
