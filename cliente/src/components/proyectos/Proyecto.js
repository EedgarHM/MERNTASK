import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareasContext";

const Proyecto = ({ proyecto }) => {
  //Obteniendo el state del formulario proyectos
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;
  const { id, nombre } = proyecto;

  // Obtener la funcion del context de tarea
  const tareasContext = useContext(tareaContext);

  // Defragment para las funciones de tareas context
  const { obtenerTareas } = tareasContext;

  // Funcion para agregar el proyecto actual
  const seleccionarProyecto = (id) =>{
    proyectoActual(id) // Fijando el proyecto actual
    obtenerTareas(id) // Filtrado de tareas cada qu se de click
  }

  return (
    <li>
      <button 
      type="button" 
      className="btn btn-blank" 
      onClick={()=>seleccionarProyecto(id)}
      >
        {nombre}
      </button>
    </li>
  );
};

export default Proyecto;
