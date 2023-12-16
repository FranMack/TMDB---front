import React from "react";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";


function Card({ movie,cleanSearch }) {
  const IMG_API = "https://image.tmdb.org/t/p/w500/";
  const navigate=useNavigate()

  const handleMovie=()=>{
    cleanSearch()
    navigate(`/movie/${movie.id}`)

  }

  const prueba=()=>{console.log("PRUEBAAAAAAAAAAAAAAAAAAAAAAA")}

  return (
    <>

      
      <div onClick={handleMovie} className="card">
      <img  className="cardImage"
           
           src={movie.backdrop_path && !movie.poster_path ? notFound :( ` ${IMG_API}/${movie.backdrop_path ? movie.backdrop_path :movie.poster_path

           }`)}
           alt={`${movie.original_title}`}
         />
         <p className="cardInfo" >{movie.original_title
 || movie.name}</p>
      </div>
        
 
     


    </>
  );
}

export default Card;
