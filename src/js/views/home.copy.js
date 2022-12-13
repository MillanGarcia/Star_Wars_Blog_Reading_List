import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
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

	const check=() =>{
		if(localStorage.length===0){
			
			//console.log("YA SE PASO");
		}else{
			
			//localStorage.setItem('test',2);
		}
	};
	//const AllTogether = planetas.concat(vehiculos,personajes);
	const displaylist = (e) => {
		modificarTexto(e);
		console.log(planetas);
		planetas.filter((planeta)=>{
			const procesado = planeta.name.split(" ").join("");
			const procesado1= procesado.toLowerCase();//procesado = texto.replace(/\s+/g, '') 
			const busqueda = procesado1.includes(texto);
			if (busqueda.length!==0 && busqueda ){
				actions.agregarSugerenciasPlanetas(planeta.name,planeta.uid);
			}
			/*{return (
				<div>AQUI IRIA LA LISTA DE SUGERENCIAS???<Link to={`/planeta/${planeta.uid}`}></Link></div>
			)}*/
		});

		vehiculos.filter((vehiculo)=>{
			const procesado = vehiculo.name.split(" ").join("");
			const procesado1= procesado.toLowerCase();
			const busqueda = procesado1.includes(texto);
			if (busqueda.length!==0 && busqueda ){
				actions.agregarSugerenciasVehiculos(vehiculo.name,vehiculo.uid);
			}
			/*{return (
				<div>AQUI IRIA LA LISTA DE SUGERENCIAS???<Link to={`/vehiculo/${vehiculo.uid}`}></Link></div>
			)}*/
		});

		personajes.filter((personaje)=>{
			const procesado = personaje.name.split(" ").join("");
			const procesado1= procesado.toLowerCase();
			const busqueda = procesado1.includes(texto);
			if (busqueda.length!==0 && busqueda ){
				actions.agregarSugerenciasPersonajes(personaje.name,personaje.uid);
			}
			/*{return (
				<div>AQUI IRIA LA LISTA DE SUGERENCIAS???<Link to={`/personaje/${personaje.uid}`}></Link></div>
			)}*/
		});
		//actions.filtro();
		/*AllTogether.filter((element)=>{
			
			const procesado = element.name.split(" ").join("");
			const procesado1= procesado.toLowerCase(); 
			const busqueda = procesado1.includes(texto);
			if (busqueda.length!==0 && busqueda ){
				if(){}
				}
			//esta.name.startsWith(texto) ? console.log(esta.name):"no";
			return  (
				<div>AQUI IRIA LA LISTA DE SUGERENCIAS???<Link to={`/vehiculo/${vehiculo.uid}`}></Link></div>
				)
		})	*/
	};
	//data1.map((planetillas)=>{
	//	localStorage.setItem('planetillas',planetillas)
	//})

	useEffect(async () => {
		//localStorage.length=0){
		const res1 = await fetch(`${config.HOSTNAME}/planets`);
		const data1 = await res1.json();
		console.log({ data1 });
		

		modificarPlanetas(data1.results);
		const estosplanetas=data1.results;
		const estosplanetas1 = estosplanetas.name;
		estosplanetas.map((planetta)=>{
			console.log(planetta.name);
		}
		);
		
		
		const res2 = await fetch(`${config.HOSTNAME}/vehicles`);
		const data2 = await res2.json();
		
		modificarVehiculos(data2.results);

		const res3 = await fetch(`${config.HOSTNAME}/people`);
		const data3 = await res3.json();
		
		modificarPersonajes(data3.results);//al equivocarme aqui, me salian los nombres de personajes pero me redirigia a vehiculos,

		/*data1.forEach(element => {
			for (const key in element) {
				console.log(`${key}: ${element[key]}`)
			}});*/
			
		modificarCargando(false);
		
	}, []);

	if(cargando) {
        return <div>La info esta cargando...</div>;
    }
	
	return (

	<div style={{ backgroundImage: 'url("/cielo-estrellado.webp")' }}>
		
			<input className="dropdown-header ms-2 mt-2" placeholder="Buscador" onChange={(e) => displaylist(e.target.value)}></input>
			<button className="btn btn-outline-secondary dropdown-toggle float-star ms-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
				Autocompletado
			</button>
			<ul className="dropdown-menu">
				{store.sugerencias.map((sug) => (
							<li><a className="dropdown-item" href="#"><Link to={`/${sug.tipo}/${sug.uid}`}>{sug.name}</Link></a> 
							</li>
							))}
			</ul>
		
		
		
		
			<button className="btn btn-outline-secondary dropdown-toggle float-end m-5" type="button" data-bs-toggle="dropdown" aria-expanded="false">
				Sable laser:&nbsp;{colors}
			</button>
				<ul className="dropdown-menu">
					<li onClick={()=>changeColor("green")}>pepe</li>
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
							<li><div><a className="dropdown-item" href="#">{fav.name}</a> 
							<button className="float-end" onClick={()=>actions.eliminarFavoritos(fav.name)}>X</button></div></li>
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
										<button className="float-end" onClick={() => actions.agregarFavoritos(`${planeta.name}`)}>Fav</button>
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


