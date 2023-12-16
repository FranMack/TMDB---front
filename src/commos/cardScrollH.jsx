import React from "react";
import { Box, Grid } from "@mui/material";
import notFound from '../assets/not-found.jpg';


function CardScrollH({ movie }) {
  const IMG_API = "https://image.tmdb.org/t/p/w500/";

  return (
    
      
      <div className="card-scroll">
      <img className="cardImage-scroll"
           
           src={movie.backdrop_path && !movie.poster_path ? notFound :( ` ${IMG_API}/${movie.backdrop_path ? movie.backdrop_path :movie.poster_path

           }`)}
           alt={`${movie.original_title || movie.name}`}
         />

         <p className="cardInfo-scroll">{movie.original_title || movie.name}</p>

      </div>
        
 
     


   
  );
}

export default CardScrollH;