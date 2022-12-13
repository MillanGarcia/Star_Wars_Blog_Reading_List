
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../config";
import { Link } from "react-router-dom";

const Personaje = (props) => {
    const params = useParams();
    const [detalle, modificardetalle] = useState({});
    const [cargando, modificarCargando] = useState(true);
    
    useEffect(async ()=>{
        const res = await fetch(`${config.HOSTNAME}/people/${params.uid}`);
        const data = await res.json();
        console.log({ detalle: data });
        modificardetalle(data.result);
        modificarCargando(false);
    }, []);    
    
    if(cargando) {
        return <div>La info esta cargando...</div>;
    }

    return (
        <div style={{ backgroundImage: 'url("/cielo-estrellado.webp")' }}>
            <div className="card w-50 m-auto" >
                <img className="card-img-top"  src="/cielo-estrellado.webp" alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title"><h1>{detalle.properties.name}</h1></h5>
                    <p className="card-text">
                        Nombre:{detalle.properties.name}<br/>
                        Genero:{detalle.properties.gender}<br/>
                        Altura:{detalle.properties.height}cm<br/>
                        Peso:{detalle.properties.mass}<br/>
                        Color de pelo:{detalle.properties.hair_color}<br/>
                        Color de piel:{detalle.properties.skin_color}<br/>
                        Color de ojos:{detalle.properties.eye_color}<br/>
                        Año de nacimiento:{detalle.properties.birth_year}<br/>                                                
              
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
    );
};

export default Personaje;
