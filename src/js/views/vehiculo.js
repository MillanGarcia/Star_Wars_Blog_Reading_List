import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../config";
import { Link } from "react-router-dom";

const Vehiculo = (props) => {
    const params = useParams();
    const [detalle, modificardetalle] = useState({});
    const [cargando, modificarCargando] = useState(true);
    
    useEffect(async ()=>{
        const res = await fetch(`${config.HOSTNAME}/vehicles/${params.uid}`);
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
                <img className="card-img-top" src="/cielo-estrellado.webp" alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title"><h1>{detalle.properties.name}</h1></h5>
                    <p className="card-text">
                        Modelo:{detalle.properties.model}<br/>
                        Clase de vehículo:{detalle.properties.vehicle_class}<br/>
                        Productor:{detalle.properties.manufacturer}<br/>
                        Coste(en creditos):{detalle.properties.cost_in_credits}creditos<br/>
                        Longitud:{detalle.properties.length}metros<br/>
                        Tripulación:{detalle.properties.crew}<br/>
                        Pasajeros:{detalle.properties.passengers}<br/>                                                
                        Velocidad máxima:{detalle.properties.max_atmosphering_speed}km/h<br/>
                        Capacidad de carga:{detalle.properties.cargo_capacity}<br/>
                        Consumibles:{detalle.properties.consumables}<br/>
                        
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

export default Vehiculo;