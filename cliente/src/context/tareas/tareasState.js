import React, { useReducer } from 'react';
import TareaContext from './tareasContext';
import TareaReducer from './tareasReducer';
import {v4 as uuid} from 'uuid';
import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_FORMULARIO_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types' ;

const TareaState = (props) =>{
    const initialState = {
        tareas : [
            { id:1, nombre: "Elegir Productos", estado: true, proyectoID:1 },
            { id:2, nombre: "Elegir Colores", estado: false, proyectoID:2 },
            { id:3, nombre: "Elegir Precios", estado: true, proyectoID:3 },
            { id:4, nombre: "Elegir Otra Cosa", estado: false, proyectoID:4 },
            { id:5, nombre: "Elegir Productos", estado: true, proyectoID:4 },
            { id:6, nombre: "Elegir Colores", estado: false, proyectoID:4 },
            { id:8, nombre: "Elegir Precios", estado: true, proyectoID:2 },
            { id:7, nombre: "Elegir Otra Cosa", estado: false, proyectoID:1 },
            { id:8, nombre: "Elegir Productos", estado: true, proyectoID:3 },
            { id:9, nombre: "Elegir Colores", estado: false, proyectoID:3 },
            { id:10, nombre: "Elegir Precios", estado: true, proyectoID:3 },
            { id:11, nombre: "Elegir Otra Cosa", estado: false, proyectoID:2 },
        ],
        tareasProyecto:null,
        errorTarea: false,
        tareaSeleccionada:null
    }

    //Creando el dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //Funciones

    //Obteniendo las tareas de un proyecto
    const obtenerTareas = (proyectoID) =>{
        dispatch({
            type : TAREAS_PROYECTO,
            payload: proyectoID
        })
    }

    //Agregando tareas al proyecto seleccionado
    const agregarTarea = (tarea)=>{
        tarea.id=uuid()
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }
    
    //Valida y muestra error si existe
    const validarTarea = ()=>{
        dispatch({
            type:VALIDAR_FORMULARIO_TAREA
        })
    }

    //Eliminar tareas por id
    const eliminarTarea = (id)=>{
        dispatch({
            type:ELIMINAR_TAREA,
            payload:id
        })
    }

    //Cambia el estado de cada tarea
    const cambiarEstadoTarea = (tarea) =>{
        dispatch({
            type:ESTADO_TAREA,
            payload: tarea
        })
    }

    //Extrae una tarea para edicion
    const guardarTareaActual = (tarea)=>{
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //ACTUALIZA UNA TAREA
    const actualizarTarea =(tarea)=>{
        dispatch({
            type:ACTUALIZAR_TAREA,
            payload:tarea
        })
    }

    //Limpia el input una vez se edita una tarea
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }
    return (
        <TareaContext.Provider
            value={{
                tareas : state.tareas,
                tareasProyecto: state.tareasProyecto,
                errorTarea:state.errorTarea,
                tareaSeleccionada:state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;