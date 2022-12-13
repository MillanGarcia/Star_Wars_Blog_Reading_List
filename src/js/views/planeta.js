import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../config";
import { Link } from "react-router-dom";
import cielo from "../../img/cielo-estrellado.webp";
import Alderaan from "../../img/2.jpg";

const Planeta = (props) => {
    const params = useParams();
    const [detalle, modificardetalle] = useState({});
    const [cargando, modificarCargando] = useState(true);
    const [nombre, modificarNombre] = useState({});

    useEffect(async ()=>{
        const res = await fetch(`${config.HOSTNAME}/planets/${params.uid}`);
        const data = await res.json();
        console.log({ detalle: data });
        modificardetalle(data.result);
        modificarCargando(false);
        modificarNombre(data.result.properties.name)
        const auxnombre={...nombre};
        console.log(auxnombre);
        const resultado=Object.values(auxnombre);
        const resultado1=resultado.join("");
    }, []);    
    
    if(cargando) {
        const elnombre=`${params.uid}`;
        console.log(elnombre);
        return <div>La info esta cargando...</div>;
        
    }
   else{
   
        console.log(nombre);
    return (
        <div style={{ backgroundImage: 'url("/cielo-estrellado.webp")' }}>
           
            <div className="card w-50  m-auto" >
                <img className="card-img-top" src="/cielo-estrellado.webp"  alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title"><h1>{detalle.properties.name}</h1></h5>
                    <p className="card-text">
                        Nombre:{detalle.properties.name}<br/>
                        Clima:{detalle.properties.climate}<br/>
                        Terreno:{detalle.properties.terrain}<br/>
                        Superficie de agua:{detalle.properties.surface_water}%<br/>
                        Gravedad(respecto a la tierra):{detalle.properties.gravity}<br/>
                        Población:{detalle.properties.population}m. de habitantes<br/>
                        Diámetro:{detalle.properties.diameter}km<br/>                                                
                        Duración del día:{detalle.properties.rotation_period}horas<br/>
                        Año(respecto a la tierra):{detalle.properties.orbital_period}días<br/>

                        
                        </p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
            <div>
                <Link to="/">
                    <button className="btn btn-primary">Back home</button>
                </Link>
            </div>
        </div>
    );}
};

export default Planeta;