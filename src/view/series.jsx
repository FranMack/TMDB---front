import React, { useEffect, useState } from "react";
import axios from "axios";
import GrillaMovies from "../content/grillaMovies";
import { Pagination } from "@mui/material";
//import ModalRegister from "../commos/modalRegister";
//import ModalLogin from "../commos/modalLogin";
import {  useSelector } from "react-redux/es/hooks/useSelector";
import Carrusel from "../content/carrusel";
import HorizontalScroll from "../content/scrollH";
import Loading from "../commos/Loading";

function Series() {
  const [series, setSeries] = useState([]);
  const [seriesPopular, setSeriesPopular] = useState([]);
  const [seriesOnAir, setSeriesOnAir] = useState([]);
  const [seriesToday, setSeriesToday] = useState([]);
  const [movieOrTv,setMovieOrTv]=useState("tv")
  const [carruselNum,setCarruselNum]=useState(0)
  const type="tv"
  

  const handleNumRight=()=>{
    if(carruselNum<9) setCarruselNum(carruselNum + 1)
  }

  const handleNumLeft=()=>{
    if(carruselNum>0)setCarruselNum(carruselNum - 1)
  }



  useEffect(() => {

    
   axios .get(`http://localhost:3000/api/content/${movieOrTv}`)
      .then((res) => setSeries(res.data.results))
      .catch((error) => {
        console.log(error);
      });

      
      let list="popular"
      axios .get(`http://localhost:3000/api/content/${type}/${list}`)
      .then((res) => setSeriesPopular(res.data.results))
      .catch((error) => {
        console.log(error);
      });

      list="on_the_air"
      axios .get(`http://localhost:3000/api/content/${type}/${list}`)
      .then((res) => setSeriesOnAir(res.data.results))
      .catch((error) => {
        console.log(error);
      });

      list="airing_today"
      axios .get(`http://localhost:3000/api/content/${type}/${list}`)
      .then((res) => setSeriesToday(res.data.results))
      .catch((error) => {
        console.log(error);
      });


  }, [movieOrTv]);

  return (
    <>
    {series.length>0 ? (<> <Carrusel movies={series} carruselNum={carruselNum} handleNumRight={handleNumRight} handleNumLeft={handleNumLeft}/>
    <h1 className="titulo-seccion">Populares</h1>
    <HorizontalScroll movies={seriesPopular}/>
    <h1 className="titulo-seccion">On the air</h1>
    <HorizontalScroll movies={seriesOnAir}/>
    <h1 className="titulo-seccion">Airing Today</h1>
    <HorizontalScroll movies={seriesToday}/></>):<Loading/>}
   
     
    </>
  );
}

export default Series;
