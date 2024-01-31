import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { formatoTiempo } from "../utils/auxiliarFunctions";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ModalTrailler from "../commos/modalTrailler";
import Loading from "../commos/Loading";

function MovieInfo() {
  const IMG_API = "https://image.tmdb.org/t/p/w500/";
  const { id, type } = useParams();
  const userId = useSelector((state) => state.user.id);

  const [movieInfo, setMovieInfo] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/content/${type}/info/${id}`)
      .then((response) => {
        setMovieInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, type]);

  const addFavorite = () => {
    if (userId && id) {
      axios
        .post(
          `http://localhost:3000/api/user/addFavorite`,
          { movieId: id, userId: userId },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response.data);
          toast.success("Agregado a Favoritos");
        })
        .catch((error) => {
          console.log(error);
          toast.warning(error.response.data.error);
        });
    } else {
      toast.error("Debe estar logueado para agregar favoritos");
    }
  };

  window.scrollTo(0, 0);

  return (
    <>
      {movieInfo.id ? (
        <>
          {movieInfo.videos.results.length > 0 && (
            <ModalTrailler
              close={handleCloseModal}
              open={modalOpen}
              videoId={`${movieInfo.videos.results[0].key}`}
            />
          )}
          <div className="info-movie">
            <img
              className="info-movie-image"
              src={
                movieInfo.backdrop_path && !movieInfo.poster_path
                  ? notFound
                  : ` ${IMG_API}/${
                      movieInfo.backdrop_path
                        ? movieInfo.backdrop_path
                        : movieInfo.poster_path
                    }`
              }
              alt={`${movieInfo.title}`}
            />
          </div>
          <div className="movie-info">
            <h1>{movieInfo.title}</h1>
            <p>{movieInfo.overview}</p>
            <p>
              <span style={{ fontWeight: "bold" }}>Estreno:</span>{" "}
              {`${movieInfo.release_date || movieInfo.first_air_date}`}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Duración:</span>{" "}
              {`${formatoTiempo(movieInfo.runtime)}`}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Género:</span>{" "}
              {movieInfo.genres && `${movieInfo.genres.map((gen) => gen.name)}`}
            </p>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "start",
              }}
            >
              {movieInfo.videos.results.length > 0 && (
                <Button
                  onClick={handleModal}
                  variant="contained"
                  sx={{
                    marginTop: "5%",
                    marginRight: "5%",
                    backgroundColor: "#ea0505",
                  }}
                >
                  Trailer
                </Button>
              )}
              <Button
                onClick={addFavorite}
                variant="contained"
                sx={{ marginTop: "5%", backgroundColor: "#ea0505" }}
              >
                Fav
              </Button>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default MovieInfo;
