import React from "react";
import { Box, Grid } from "@mui/material";
import Card from "../commos/Card";
import { Link } from "react-router-dom";

function GrillaMovies({ movies, searchResults, cleanSearch }) {
  return (
    <>
      <div className="grilla">
        {movies &&
          movies.map((movie, i) => {
            return <Card key={i} movie={movie} cleanSearch={cleanSearch} />;
          })}
        {searchResults &&
          searchResults.map((movie, i) => {
            return <Card key={i} movie={movie} cleanSearch={cleanSearch} />;
          })}
      </div>
    </>
  );
}

export default GrillaMovies;
