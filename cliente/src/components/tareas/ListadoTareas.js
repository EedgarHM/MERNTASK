import React, { useContext } from "react";
import Tarea from "./Tarea";

import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareasContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoTareas = () => {
  // Obtener el state del formulario
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;

  // Obtener las tareas del proyecto
  const tareasContext = useContext(tareaContext);
  const { tareasProyecto } = tareasContext;

  //Si no hay proyeto seleccionados
  if (!proyecto) return <h2> Selecciona un proyecto</h2>;
  // Obtener el proyecto actual
  const [proyectoActual] = proyecto;

  return (
    <>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasProyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasProyecto.map((tarea) => (
              <CSSTransition 
                key={tarea.id} 
                timeout={900}
                classNames="tarea"
              >
                  <Tarea tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        className="btn btn-primario "
        onClick={() => eliminarProyecto(proyectoActual.id)}
      >
        Eliminar Proyecto
      </button>
    </>
  );
};

export default ListadoTareas;
