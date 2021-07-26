import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareasContext";

const Tarea = ({ tarea }) => {
  const { nombre, estado} = tarea;

  //Extraer si un proyecto esta activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;
  const [proyectoActual] = proyecto;

  // Obtener la funcion de tareas
  const tareasContext = useContext(tareaContext);
  const { eliminarTarea, obtenerTareas,cambiarEstadoTarea, guardarTareaActual} = tareasContext;

  // Funcion que se ejecuta cuando el usuarioi presiona el boton de eliminar tarea
  const eliminarTareaID = (id) => {
    eliminarTarea(id);
    obtenerTareas(proyectoActual.id);
  };

  //Funcion que modifica el estado de las tareas
  const cambiarEstado = (tarea)=>{
    if(tarea.estado){
      tarea.estado=false;
    }else{
      tarea.estado=true;
    }
    cambiarEstadoTarea(tarea);
  }

  //Agrega una tarea actual cuando el usuario da click en editar
  const seleccionarTarea = (tarea)=>{
    guardarTareaActual(tarea)
  }
  return (
    <li className="tarea sombra">
      <p>{nombre}</p>
      <div className="estado">
        {estado ? (
          <button type="button" className="completo" onClick={()=>cambiarEstado(tarea)}>
            Completo
          </button>
        ) : (
          <button type="button" className="incompleto" onClick={()=>cambiarEstado(tarea)}>
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button 
          type="button" 
          className="btn btn-primario"
          onClick={()=>seleccionarTarea(tarea)}
          >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={()=>eliminarTareaID(tarea.id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
