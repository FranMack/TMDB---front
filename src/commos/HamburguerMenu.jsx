import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { Avatar, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/user.slice";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { setModalState } from "../redux/modal.slice";
import { setModalRegisterState } from "../redux/modalRegister.slice";
import { setModalProfileState } from "../redux/modalProfile";

export default function TemporaryDrawer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [state, setState] = useState({
    right: false,
  });

  const [url_img, setUrl_img] = useState("");

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

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
        if (location === "favorites") {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleModalLogin = () => {
    dispatch(setModalState({ modalOpen: true }));
  };
  const handleModaRegister = () => {
    dispatch(setModalRegisterState({ modalOpen: true }));
  };

  const handleModalProfile = () => {
    dispatch(setModalProfileState({ modalOpen: true }));
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,

        height: "100vh",
        backgroundColor: "#080f28",
        color: "white",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {user.name ? (
          <ListItem>
            <Avatar
              src={user.url_img ? user.url_img : url_img}
              sx={{ marginRight: "5%" }}
            ></Avatar>
            {user.username}
          </ListItem>
        ) : (
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "center",
              fontSize: "2rem",
              fontFamily: "sans-serif",
              fontWeight: "bold",
            }}
          >
            TMDB
          </ListItem>
        )}
      </List>
      <Divider />
      <List>
        <ListItem
          disablePadding
          onClick={() => {
            navigate("/");
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <IconButton>
                <MovieCreationIcon sx={{ fill: "white" }} />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Movies" />
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          onClick={() => {
            navigate("/tv");
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <IconButton>
                <LiveTvIcon sx={{ fill: "white" }} />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="TV" />
          </ListItemButton>
        </ListItem>
        {user.name ? (
          <>
            <ListItem disablePadding onClick={handleModalProfile}>
              <ListItemButton>
                <ListItemIcon>
                  <IconButton>
                    <AccountCircleIcon sx={{ fill: "white" }} />
                  </IconButton>
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding component={Link} to="/favorites">
              <ListItemButton>
                <ListItemIcon>
                  <IconButton>
                    <FavoriteIcon sx={{ fill: "white" }} />
                  </IconButton>
                </ListItemIcon>
                <ListItemText sx={{ color: "white" }} primary="Favorites" />
              </ListItemButton>
            </ListItem>
            <ListItem onClick={handleLogout} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <IconButton>
                    <LogoutIcon sx={{ fill: "white" }} />
                  </IconButton>
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem onClick={handleModaRegister} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <IconButton>
                    <AppRegistrationIcon sx={{ fill: "white" }} />
                  </IconButton>
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
            <ListItem onClick={handleModalLogin} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <IconButton>
                    <LogoutIcon sx={{ fill: "white" }} />
                  </IconButton>
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            onClick={toggleDrawer(anchor, true)}
            sx={{ color: "white", marginRight: "2%" }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}
