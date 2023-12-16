import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect,useState } from "react";
import GrillaMovies from "../content/grillaMovies";
import Loading from "../commos/Loading";

function Favorites({cleanSearch}){

    const user=useSelector(state=>state.user)
    const userId=user.id

    const [favoritesMovies,setFavoritesMovies]=useState([])

    useEffect(()=>{

        if(userId){
            axios.get(`http://localhost:3000/api/user/favorites?userId=${userId}`,{withCredentials:true})
            .then((response)=>{
                console.log("======>",response.data)
                axios.post("http://localhost:3000/api/content/favoritesInfo",{moviesId:response.data},{withCredentials:true})
                .then((response)=>{setFavoritesMovies(response.data)})
            })
            .catch((error)=>{console.log(error)})
        }
     
    },[user])

console.log("moviesInfo",favoritesMovies)
    return(
        <>
    {favoritesMovies.length>0 ? (<GrillaMovies movies={favoritesMovies} cleanSearch={cleanSearch}/>):<Loading/>}
    </>
    )
}
export default Favorites;