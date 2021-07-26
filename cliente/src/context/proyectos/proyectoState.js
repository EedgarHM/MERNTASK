import React, { useReducer } from "react";

import {v4 as uuid} from 'uuid';

import proyectosContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";

import { 
  FORMULARIO_PROYECTO, 
  OBTENER_PROYECTOS, 
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO
} from "../../types";

const ProyectoState = (props) => {
  const proyectos = [
    { id: 1, nombre: "Tienda" },
    { id: 2, nombre: "Internet" },
    { id: 3, nombre: "Programacion" },
    { id: 4, nombre: "MERN TASK" },
  ];
  //Cuando se de clic en Nuevo proyecto se mostrara el formulario para agregar un proyecto
  const initialState = {
    proyectos: [],
    formulario: false,
    errorFormulario: false,
    proyecto: null //Proyecto que este seleccionado
  };

  //dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  // Funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };
  // Obtener los proyectos con el dispatch
  const obtenerProyectos = () => {
    //Lo que tome la funcion como parametro es lo que sera el payload
    dispatch({
      type: OBTENER_PROYECTOS,
      payload: proyectos,
    });
  };

  //Agregar nuevo proyecto 
  const agregarProyecto = proyecto => {
    proyecto.id = uuid();

    //agregar el proyecto en el state con el dispatch
    dispatch({
        type: AGREGAR_PROYECTO,
        payload: proyecto
    })
  }
  
  //Validar formulario
  const mostrarError = ()=>{
      dispatch({
          type: VALIDAR_FORMULARIO,
      })
  }

  //Obteniendo el proyecto actual, cuando se le de clic
  const proyectoActual = (proyectoID) =>{
    dispatch({
      type: PROYECTO_ACTUAL,
      payload:proyectoID//se le pasa el id del proyecto
    })
  }

  // Eliminar un proyecto
  const eliminarProyecto = (proyectoID) => {
    dispatch({
      type:ELIMINAR_PROYECTO,
      payload: proyectoID
    })
  }
  return (
    <proyectosContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorFormulario: state.errorFormulario,
        proyecto:state.proyecto,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto
      }}
    >
      {props.children}
    </proyectosContext.Provider>
  );
};

export default ProyectoState;
