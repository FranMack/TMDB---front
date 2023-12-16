import React, { useEffect, useState } from "react";
import axios from "axios";
import GrillaMovies from "../content/grillaMovies";
import { Pagination } from "@mui/material";
//import ModalRegister from "../commos/modalRegister";
//import ModalLogin from "../commos/modalLogin";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Carrusel from "../content/carrusel";
import HorizontalScroll from "../content/scrollH";
import Loading from "../commos/Loading";

function Home() {
  const [movies, setMovies] = useState([]);
  const [moviesTop, setMoviesTop] = useState([]);
  const [moviesPopular, setMoviesPopular] = useState([]);
  const [moviesUpcoming, setMoviesUpcoming] = useState([]);
  const [movieOrTv, setMovieOrTv] = useState("movie");
  const [carruselNum, setCarruselNum] = useState(0);
  const type = "movie";

  const handleNumRight = () => {
    if (carruselNum < 9) setCarruselNum(carruselNum + 1);
  };

  const handleNumLeft = () => {
    if (carruselNum > 0) setCarruselNum(carruselNum - 1);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/content/${movieOrTv}`)
      .then((res) => setMovies(res.data.results))
      .catch((error) => {
        console.log(error);
      });

    let list = "top_rated";
    axios
      .get(`http://localhost:3000/api/content/${type}/${list}`)
      .then((res) => setMoviesTop(res.data.results))
      .catch((error) => {
        console.log(error);
      });

    list = "popular";
    axios
      .get(`http://localhost:3000/api/content/${type}/${list}`)
      .then((res) => setMoviesPopular(res.data.results))
      .catch((error) => {
        console.log(error);
      });

    list = "upcoming";
    axios
      .get(`http://localhost:3000/api/content/${type}/${list}`)
      .then((res) => setMoviesUpcoming(res.data.results))
      .catch((error) => {
        console.log(error);
      });
  }, [movieOrTv]);


  
  return (
    <>
      {movies.length > 0 ? (
        <>
          {" "}
          <Carrusel
            movies={movies}
            carruselNum={carruselNum}
            handleNumRight={handleNumRight}
            handleNumLeft={handleNumLeft}
          />
          <h1 className="titulo-seccion">Up coming</h1>
          <HorizontalScroll movies={moviesUpcoming} />
          <h1 className="titulo-seccion">Top Rated</h1>
          <HorizontalScroll movies={moviesTop} />
          <h1 className="titulo-seccion">Populares</h1>
          <HorizontalScroll movies={moviesPopular} />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Home;
