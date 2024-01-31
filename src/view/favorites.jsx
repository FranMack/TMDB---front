import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import GrillaMovies from "../content/grillaMovies";
import Loading from "../commos/Loading";
import NoHayFavoritos from "./NoHayFavoritos";
import { Navigate } from "react-router-dom";


function Favorites({ cleanSearch }) {
  const user = useSelector((state) => state.user);
  const userId = user.id;
  const userLogged=useSelector((state)=>state.user.name)

  const [favoritesMovies, setFavoritesMovies] = useState(null);
  


  useEffect(() => {
    
    if (userId) {
      axios
        .get(`http://localhost:3000/api/user/favorites?userId=${userId}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log("======>", response.data);
          axios
            .post(
              "http://localhost:3000/api/content/favoritesInfo",
              { moviesId: response.data },
              { withCredentials: true }
            )
            .then((response) => {
              setFavoritesMovies(response.data);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  function deleteMovie(movieId){
    let movies=favoritesMovies.filter((movie)=>{return movie.id !==movieId})
    setFavoritesMovies([...movies])
  }

  const handleDeleteFavorite = (movieId) => {
    if (movieId) {
      axios
        .delete("http://localhost:3000/api/user/deleteFavorite", {
          params: {
            userId: userId,
            movieId: movieId,
          },
        })
        .then((res) => {
          console.log(res.data);
          deleteMovie(movieId)
        })
        .catch((error) => {
          console.log(error);
          
        });
    }
  };

   window.scrollTo(0,0)

   console.log("xxxxxxxxxx",favoritesMovies)
   return (
    <>
      {userLogged ? (
        <div style={{ minHeight: "88vh" }}>
          {favoritesMovies !== null ? (
            favoritesMovies.length > 0 ? (
              <GrillaMovies
                movies={favoritesMovies}
                cleanSearch={cleanSearch}
                handleDeleteFavorite={handleDeleteFavorite}
              />
            ) : (
              <NoHayFavoritos/>
            )
          ) : (
            <Loading />
          )}
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
export default Favorites;
