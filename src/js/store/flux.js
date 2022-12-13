import { object } from "prop-types";
import { useState } from "react";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			favoritos:[
				
			],
			sugerencias:[
				
			],
			planetas: [

			],
			vehiculos: [

			],
			personajes: [

			],
		},
		actions: {
			agregarSugerenciasPlanetas: (name,uid)=>{
				const store = getStore();
				const auxSugerencias= [...store.sugerencias];
				auxSugerencias.push({
					uid: uid,
					name: name,
					tipo: "planeta"
				});
				setStore({sugerencias: auxSugerencias});

			},
			agregarSugerenciasVehiculos: (name,uid)=>{
				const store = getStore();
				const auxSugerencias= [...store.sugerencias];
				auxSugerencias.push({
					uid: uid,
					name: name,
					tipo: "vehiculo"
				});
				setStore({sugerencias: auxSugerencias});

			},
			agregarSugerenciasPersonajes: (name,uid)=>{
				const store = getStore();
				const auxSugerencias= [...store.sugerencias];
				auxSugerencias.push({
					uid: uid,
					name: name,
					tipo: "personaje"
				});
				setStore({sugerencias: auxSugerencias});

			},
			eliminarTodoSugerencias: () =>{
				const store = getStore();
				const auxSugerencias = [...store.sugerencias];
				const listaTotalSug = auxSugerencias.length;
				for (let index = 0; index < listaTotalSug; index++) {
					auxSugerencias.pop();
					console.log("lo hemos popeado")
					console.log({auxSugerencias})
				}
				setStore({ sugerencias: auxSugerencias });
				
			},
			SugerenciasCero: () =>{
				const store = getStore();
				const auxSugerencias = [...store.sugerencias];
				auxSugerencias.forEach((elem)=>{
					auxSugerencias.pop();
					console.log("fuera")
				})
				setStore({ sugerencias: auxSugerencias });
				
			},
			/*filtro: ()=>{
                const store = getStore();
                const auxSugerencias= [...store.sugerencias];
                auxSugerencias.filter((item,index)=>(
                auxSugerencias.indexOf((item)===index))),
                setStore({sugerencias: auxSugerencias});
            },*/

			agregarFavoritos: (name) =>{
				console.log({ name });
				const store = getStore();
				const auxPersonas = [...store.favoritos];
				const found = auxPersonas.find(persona => persona.name===name);
				found===undefined ? 
					auxPersonas.push({
					uid: auxPersonas.length + 1,
					name: name,
					state: false,
					}) 
				:console.log("nada");				
				console.log({ auxPersonas});
				setStore({ favoritos: auxPersonas });
				
			},
			agregarPlanetas: (planeta)=>{
				const store = getStore();
			},

			eliminarFavoritos: (name) =>{
				const store= getStore();
				const auxPersonas = [...store.favoritos];
				const newPersonas = auxPersonas.filter(persona => persona.name!==name);
				setStore({ favoritos: newPersonas})
				console.log({ newPersonas });
			},
			
			eliminarTodoFavoritos: () =>{
				const store = getStore();
				const auxPersonas = [...store.favoritos];
				const listaTotal = auxPersonas.length;
				for (let index = 0; index < listaTotal; index++) {
					auxPersonas.pop();
				}
				console.log({ auxPersonas});
				setStore({ favoritos: auxPersonas });
				
			},
			
			//eliminarFavoritos: () => {
				//const auxPersonas = 

			//},			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
