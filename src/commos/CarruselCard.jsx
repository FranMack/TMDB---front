import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

function CarruselCard({ movie, handleNumLeft, handleNumRight }) {
  const IMG_API = "https://image.tmdb.org/t/p/w500/";

  const [changingImage, setChangingImage] = useState(false);

  const handleImageChange = () => {
    // Antes de cambiar la imagen, activa el estado changingImage
    setChangingImage(true);
    // Luego, realiza el cambio de imagen (por ejemplo, llamando a handleNumLeft o handleNumRight)
    // ...

    // Después de un tiempo (puedes ajustar el tiempo según tus necesidades), desactiva changingImage
    setTimeout(() => {
      setChangingImage(false);
    }, 0); // 2000ms es el mismo tiempo de la transición en tu CSS
  };

  return (
    <>
      {movie && movie.backdrop_path && (
        <div className={`${changingImage ? "changingImage" : "carruselCard"}`}>
          <ArrowBackIosNewIcon
            fontSize="large"
            sx={{
              position: "absolute",
              left: "5%",
              bottom: "10%",
              fontSize: "3rem",
              "&:hover": { color: "#f7a102" },
            }}
            onClick={() => {
              handleImageChange();
              handleNumLeft();
            }}
          />
          <img
            className="cardImage"
            src={`${IMG_API}/${movie.backdrop_path}`}
            alt={`${movie.original_title}`}
          />

          <ArrowForwardIosIcon
            fontSize="large"
            sx={{
              position: "absolute",
              right: "5%",
              bottom: "10%",
              fontSize: "3rem",
              "&:hover": { color: "#f7a102" },
            }}
            onClick={() => {
              handleImageChange(), handleNumRight();
            }}
          />

          <div className="carruselInfo">
            <h1>{movie.original_title}</h1>
            <p>{movie.overview.slice(0, 190) + "..."}</p>

            <Link to={`movie/${movie.id}`}>
              <Button
                variant="contained"
                sx={{ marginTop: "5%", backgroundColor: "#ea0505" }}
              >
                More info
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default CarruselCard;
