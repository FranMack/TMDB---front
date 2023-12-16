import React from "react";
import CarruselCard from "../commos/CarruselCard";

function Carrusel({movies,carruselNum,handleNumRight,handleNumLeft}){

    
    return(
        <>
        
       <CarruselCard movie={movies[carruselNum]} handleNumRight={handleNumRight} handleNumLeft={handleNumLeft}/>
       <div className="box-pelotitas">
       {movies.slice(0,10).map((movie,i)=>{
       
        {return carruselNum===i ?<div key={i} className="pelotita-selecionada"></div> :<div key={i} className="pelotita"></div> }
        
       })}
       </div>
        </>
    )
}

export default Carrusel;