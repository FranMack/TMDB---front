import React from "react";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setModalConfirmState } from "../redux/modalConfirm";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalConfirm from "./modalConfirm";
import notFound from "../assets/not-found.jpg";

function Card({ movie, cleanSearch, handleDeleteFavorite }) {
  const IMG_API = "https://image.tmdb.org/t/p/w500/";
  const navigate = useNavigate();

  const handleMovie = () => {
    cleanSearch();
    navigate(`/movie/${movie.id}`);
  };

  const location = useLocation().pathname.slice(1);

  const user = useSelector((state) => state.user);
  const userId = user.id;
  const modalConfirm = useSelector((state) => state.modalConfirm.modalOpen);
  const dispatch = useDispatch();

  console.log("ssssssss", movie.id);

  const handleModalConfirm = () => {
    dispatch(setModalConfirmState({ modalOpen: true, movieId: movie.id }));
  };

  return (
    <>
      <ModalConfirm handleDeleteFavorite={handleDeleteFavorite} />
      <div className="card">
        {location === "favorites" && (
          <DeleteIcon
            onClick={() => {
              handleModalConfirm();
            }}
            sx={{
              color: "#f7a102",
              position: "absolute",
              zIndex: "50",
              right: "1%",
              fontSize: "2rem",
              "&:hover": { color: "red" },
            }}
          />
        )}
        <img
          onClick={() => {
            handleMovie();
          }}
          className="cardImage"
          src={
            movie.backdrop_path && !movie.poster_path
              ? notFound
              : ` ${IMG_API}/${
                  movie.backdrop_path ? movie.backdrop_path : movie.poster_path
                }`
          }
          alt={`${movie.original_title}`}
        />
        <p className="cardInfo">{movie.original_title || movie.name}</p>
      </div>
    </>
  );
}

export default Card;
