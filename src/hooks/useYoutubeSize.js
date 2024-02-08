import { useEffect,useState } from "react";


function useYoutubeSize(){
    const [medidas, setMedidas] = useState(null);


    useEffect(() => {
      const ventana = document.querySelector("#ventana");
  
      if (ventana && ventana.clientHeight && ventana.clientWidth) {
        const medidas = {
          ancho: ventana.clientWidth,
          alto: ventana.clientHeight,
        };
  
        setMedidas(medidas);
      }
    }, []);
  
    // Opciones del reproductor de YouTube
    const opts = {
      height: medidas?.alto,
      width: medidas?.ancho,
      
    };

    return {opts}

}

export {useYoutubeSize};