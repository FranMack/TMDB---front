import React from "react";
import { Box, Grid } from "@mui/material";
import Card from "../commos/Card";
import { Link } from "react-router-dom";

function GrillaMovies({ movies, searchResults, cleanSearch,handleDeleteFavorite }) {
  return (
    <>
      <div className="grilla">
        {movies &&
          movies.map((movie, i) => {
            return <Card key={i} movie={movie} cleanSearch={cleanSearch} handleDeleteFavorite={handleDeleteFavorite} />;
          })}
        {searchResults &&
          searchResults.map((movie, i) => {
            return <Card key={i} movie={movie} cleanSearch={cleanSearch} handleDeleteFavorite={handleDeleteFavorite} />;
          })}
      </div>
    </>
  );
}

export default GrillaMovies;
