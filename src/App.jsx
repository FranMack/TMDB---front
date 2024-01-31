import "./App.css";
import axios from "axios";
import Navbar from "./commos/Navbar";
import Home from "./view/home";
import Series from "./view/series";
import Footer from "./commos/Footer";
import Favorites from "./view/favorites";
import MovieInfo from "./view/movieInfo";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/user.slice";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router";
import ModalRegister from "./commos/modalRegister";
import ModalLogin from "./commos/modalLogin";
import GrillaMovies from "./content/grillaMovies";
import { useLocation } from "react-router-dom";
import NavbarMobile from "./commos/NavbarMobile";

import ModalProfile from "./commos/modalProfile";


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const finalPath = useLocation().pathname.split("/").reverse()[0];
  const location = useLocation().pathname;
  const location2 = useLocation().pathname.split("/");
  location2.pop();
  let pathEraseNavigate = location2.join("/");


  const [path, setPath] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user/me", { withCredentials: true })
      .then((res) => {
        axios
          .get(`http://localhost:3000/api/user/info/${res.data.email}`, {
            withCredentials: true,
          })
          .then((response) => {
            dispatch(setUser(response.data));
          });
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setPath(location);
  }, [location]);

  const showTv = () => {
    setMovieOrTv("tv");
  };

  const showMovies = () => {
    setMovieOrTv("movie");
  };

  const cleanSearch = () => {
    setSearchValue("");
  };

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const [searchResults, setSearchResult] = useState([]);

  useEffect(() => {
    if (searchValue && finalPath !== "search") {
      axios
        .get(
          `http://localhost:3000/api/content/movie/search?query=${searchValue}`
        )
        .then((result) => {
          setSearchResult(result.data);
        })
        .then(() => {
          if (path === "/") {
            navigate(`/search`);
          } else {
            navigate(`${path}/search`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (searchValue && finalPath === "search") {
      axios
        .get(
          `http://localhost:3000/api/content/movie/search?query=${searchValue}`
        )
        .then((result) => {
          setSearchResult(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (!searchValue && finalPath === "search") {
      navigate(pathEraseNavigate);
    }
  }, [searchValue, navigate]);



  return (
    <>
      <ToastContainer />
      <ModalLogin />
      <ModalRegister />
      <ModalProfile/>
      <NavbarMobile 
        showMovies={showMovies}
        searchValue={searchValue}
        handleSearch={handleSearch}
        cleanSearch={cleanSearch}/>
      <Navbar
        showTv={showTv}
        showMovies={showMovies}
        searchValue={searchValue}
        handleSearch={handleSearch}
        cleanSearch={cleanSearch}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="tv" element={<Series />} />
        <Route path="/:type/:id" element={<MovieInfo />} />

        <Route
          path="favorites"
          element={<Favorites cleanSearch={cleanSearch} />}
        />

        <Route
          path="/:type/:id/search"
          element={
            <GrillaMovies
              searchResults={searchResults}
              cleanSearch={cleanSearch}
            />
          }
        />
        <Route
          path="search"
          element={
            <GrillaMovies
              searchResults={searchResults}
              cleanSearch={cleanSearch}
            />
          }
        />
        <Route
          path="/:type/search"
          element={
            <GrillaMovies
              searchResults={searchResults}
              cleanSearch={cleanSearch}
            />
          }
        />
    
      </Routes>
      <Footer />
    </>
  );
}

export default App;
