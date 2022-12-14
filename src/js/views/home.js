import React, { useState, useEffect, useContext } from "react";
import { Link, matchPath } from "react-router-dom";
import config from "../config";
import "../../styles/home.css";
import "../../styles/sableluzmango.css";
import cielo from "../../img/cielo-estrellado.webp";
import Mango from "../../img/mangosableluz.webp";

import { Context } from "../store/appContext";
import { fileURLToPath } from "url";

export const Home = () => {
	//espada laser
	var defaultWidth = "200px";
    const [width,setWidth] = useState(defaultWidth);
	const [colors, setColors] = useState("blue");
	const [brillo, setBrillo] = useState("white");
	//display de la API
	const [planetas, modificarPlanetas] = useState([]);
	const [vehiculos, modificarVehiculos] = useState([]);
	const [personajes, modificarPersonajes] = useState([]);
	const [cargando, modificarCargando] = useState(true);
	//buscador
	const [texto, modificarTexto] =useState("");
	//lista de dropdown
	const { store, actions } = useContext(Context);
	
	
	const changeWidth = () =>{
        width==="200px"? setWidth("0px"):setWidth("200px");
    };
	
	const changeColor = (colores) =>{
		//localStorage.clear();
		setColors(colores);
		setBrillo("white");
		if(colores==="black"){
			setBrillo(colores);
			setColors("white")
		}
		
	};

	//const AllTogether = planetas.concat(vehiculos,personajes);
	const displaylist = (e) => {
		if(e===""){
			 actions.SugerenciasCero();
			 actions.SugerenciasCero();
			 actions.SugerenciasCero();
			 actions.SugerenciasCero();
		}
		if(e!==""){
		console.log({ e })
		
		const options = ["planetas", "vehiculos", "personajes"]
		const obj = { planetas, vehiculos, personajes }
		const auxPlanetas= [...planetas]
		const auxVehiculos=[...vehiculos]
		const auxPersonajes=[...personajes]

		let result = []
		actions.eliminarTodoSugerencias();
		//filtro a planetas
		result = auxPlanetas.filter((element)=>{
			const match= element.name.toLowerCase()
			return match.includes(e)
		})
		for(let i=0;i<result.length;i++){
			actions.agregarSugerenciasPlanetas(result[i].name,result[i].uid);
			result.shift();
		};
		//filtro a vehiculos
		result = auxVehiculos.filter((element)=>{
			const match= element.name.toLowerCase()
			return match.includes(e)
		})
		for(let i=0;i<result.length;i++){
			actions.agregarSugerenciasVehiculos(result[i].name,result[i].uid);
			result.shift();
		};
		//filtro a personajes
		result = auxPersonajes.filter((element)=>{
			const match= element.name.toLowerCase()
			return match.includes(e)
		});

		for(let i=0;i<result.length;i++){
			actions.agregarSugerenciasPersonajes(result[i].name,result[i].uid);
			result.shift();
		};
		console.log(result)
		}
				

	};
	
	const favcolor = (element) => {
		
	}
		
	
	useEffect(async () => {
		
		if(localStorage.planetas){
			const reto1 = JSON.parse(localStorage.getItem("planetas"));
			modificarPlanetas(reto1);
			console.log({planetas})
			console.log("Se esta cargando la informacion desde localStorage")
		}
		else{
			const res1 = await fetch(`${config.HOSTNAME}/planets`);
			const data1 = await res1.json();
			
			localStorage.setItem("planetas",JSON.stringify(data1.results))
			modificarPlanetas(data1.results);
			console.log({ data1 })
			console.log("Se esta realizando el fetch a la API")
		}
		

		if(localStorage.vehiculos){
			const reto2 = JSON.parse(localStorage.getItem("vehiculos"));
			modificarVehiculos(reto2);
			console.log({vehiculos})
			console.log("Se esta cargando la informacion desde localStorage")
		}
		else{
			const res2 = await fetch(`${config.HOSTNAME}/vehicles`);
			const data2 = await res2.json();
			
			localStorage.setItem("vehiculos",JSON.stringify(data2.results))
			modificarVehiculos(data2.results);
			console.log({ data2 })
			console.log("Se esta realizando el fetch a la API")
		}


		if(localStorage.personajes){
			const reto3 = JSON.parse(localStorage.getItem("personajes"));
			modificarPersonajes(reto3);
			console.log({personajes})
			console.log("Se esta cargando la informacion desde localStorage")
		}
		else{
			const res3 = await fetch(`${config.HOSTNAME}/people`);
			const data3 = await res3.json();
			
			localStorage.setItem("personajes",JSON.stringify(data3.results))
			modificarPersonajes(data3.results);
			console.log({ data3 })
			console.log("Se esta realizando el fetch a la API")
		}
			
		modificarCargando(false);
		
	}, []);

	if(cargando) {
        return <div>La info esta cargando...</div>;
    }
	
	return (

	<div style={{ backgroundImage: 'url("/cielo-estrellado.webp")' }}>
		
			<input className="dropdown-header ms-2 mt-2" placeholder="Buscador" onChange={(e) => displaylist(e.target.value)}></input>
			
			<ul className="list-group" >
				{store.sugerencias.map((sug) => (
							<li class="list-group-item w-25 "><a  href="#"><Link to={`/${sug.tipo}/${sug.uid}`}>{sug.name}</Link></a> 
							</li>
							))}
			</ul>
			
		
		
		
			<button className="btn btn-outline-secondary dropdown-toggle float-end m-5" type="button" data-bs-toggle="dropdown" aria-expanded="false">
				Sable laser(haga click sobre el mango para guardarlo):&nbsp;{colors}
			</button>
				<ul className="dropdown-menu">
					<li onClick={()=>changeColor("green")}>Verde</li>
					<li onClick={()=>changeColor("purple")}>Morado</li>
					<li onClick={()=>changeColor("red")}>Rojo</li>
					<li onClick={()=>changeColor("blue")}>Azul</li>
					<li onClick={()=>changeColor("orange")}>Naranja</li>
					<li onClick={()=>changeColor("black")}>Negro</li>
					
				</ul>
				
			<button className="btn btn-outline-secondary dropdown-toggle float-end m-5 bg-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
				Favoritos&nbsp;{store.favoritos.length}
			</button>
				<ul className="dropdown-menu">
				{store.favoritos.map((fav) => (
							<li><div className="d-flex my-1"><a className="dropdown-item " href="#">{fav.name}</a> <button className="float-end me-1" onClick={()=>actions.eliminarFavoritos(fav.name)}>X</button>
							</div></li>
							))}
				<li><hr className="dropdown-divider"/></li>
				<li><a className="dropdown-item"  onClick={()=>actions.eliminarTodoFavoritos()}>Eliminar todos</a></li>
				</ul>

			<div id="sablelaser" className="d-flex w-100" style={{height:"100px"}}>
					<div style={{position:"absolute",marginTop:"-3px",marginLeft:"2px"}} >
						<img src={Mango} className="mymango" onClick={()=>changeWidth()}/>
					</div>
					<div className="mylaser" style={{width: width ,borderColor: colors ,boxShadow:`0px 0px 20px ${colors}`, backgroundColor: brillo}}>
					</div>
            </div>	
				
					
		<div>		
			<h1 className="text-center texto-borde" id="starwars">STAR WARS</h1>			
				<div>
					<h1 className="text-center texto-borde" id="planetas">PLANETAS</h1>	
					<div className="d-flex overflow-auto m-auto mydiv" >
						{planetas.map((planeta) => (
							<div className="d-inline  ">
								<div className="card  m-1 mycard"  id={planeta.name}>
										<img className="card-img-top " src={cielo} alt="Card image cap"/>
									<div className="card-body">
										<h5 className="card-title">{planeta.name}</h5>
										<p className="card-text ">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
										<button className="btn btn-light"><Link to={`/planeta/${planeta.uid}`}>Learn more!</Link></button>
										<button className="float-end" onClick={() => actions.agregarFavoritos(`${planeta.name}`)} style={{backgroundColor:favcolor(planeta.name)}}>Fav</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>			

				<div>
					<h1 className="text-center texto-borde">VEHICULOS</h1>
					<div className="d-flex overflow-auto m-auto mydiv" >
						{vehiculos.map((vehiculo) => (
							<div className="d-inline  ">
								<div className="card  m-1 mycard" >
										<img className="card-img-top " src={cielo} alt="Card image cap"/>
									<div className="card-body">
										<h5 className="card-title">{vehiculo.name}</h5>
										<p className="card-text ">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
										<button className="btn btn-light"><Link to={`/vehiculo/${vehiculo.uid}`}>Learn more!</Link></button>
										<button className="float-end" onClick={() => actions.agregarFavoritos(`${vehiculo.name}`)}>Fav</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div>
					<h1 className="text-center texto-borde">PERSONAJES</h1>
					<div className="d-flex overflow-auto m-auto mydiv" >	
						{personajes.map((personaje) => (
							<div className="d-inline  ">
								<div className="card  m-1 mycard" >
										<img className="card-img-top " src={cielo} alt="Card image cap"/>
									<div className="card-body">
										<h5 className="card-title">{personaje.name}</h5>
										<p className="card-text ">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
										<button className="btn btn-light"><Link to={`/personaje/${personaje.uid}`}>Learn more!</Link></button>
										<button className="float-end" onClick={() => actions.agregarFavoritos(`${personaje.name}`)}>Fav</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				
		</div>
		
	</div>
	);
};


