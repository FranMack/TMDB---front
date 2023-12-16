export function formatoTiempo(min){
    const hora = (min / 60).toFixed(2);
    console.log(hora)
    const h=Number(hora)>=10 ? hora.toString().split(".")[0] :"0"+hora.toString().split(".")[0]
    const m=(Number(hora.toString().split(".")[1])*0.6).toFixed(0)
   


return `${h}:${m}`
}