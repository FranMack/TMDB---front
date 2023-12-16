import React from "react";
import { Modal,Box } from "@mui/material";
import YouTube from "react-youtube";
import CloseIcon from "@mui/icons-material/Close";

function ModalTrailler({open,videoId,close}){


    return(<Modal open={open} sx={{display:"flex", justifyContent:"center",alignItems:"center"}}>
   

        <Box sx={{padding:"0% 1% 1% 1%",backgroundColor: "rgba(8, 15, 40,0.8)",}}>
            <Box sx={{width:"100%",display:"flex",justifyContent:"end"}}><CloseIcon sx={{color:"white", "&:hover":{color:"red"}}} onClick={close}/></Box>
        <YouTube videoId={videoId}/>
        </Box>

       
     


    </Modal>)

}

export default ModalTrailler