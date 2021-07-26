import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from '../../context/tareas/tareasContext';


const FormTarea = () => {
  // Extraer si un proyecto esta activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  // Obtener la funcion de tareas
  const tareasContext = useContext(tareaContext);
  const {tareaSeleccionada, 
    errorTarea, agregarTarea,validarTarea,obtenerTareas,actualizarTarea,limpiarTarea } = tareasContext;

  //Effect que detecta si hay una tarea seleccionada
  useEffect(()=>{
    if(tareaSeleccionada!==null){
      guardarTarea(tareaSeleccionada)
    }else{
      guardarTarea({
        nombre: ''
      })
    }
  },[tareaSeleccionada])

  // state del formulario
  const [tarea, guardarTarea] = useState({
      nombre : ''
  })

  //Extraer el nombre del proyecto
  const { nombre } = tarea;

  //Si no hay proyeto seleccionados
  if (!proyecto) return null;

  // Obtener el proyecto actual
  const [proyectoActual] = proyecto;

  // Leer los valores del formulario
  const handleChange = (e)=>{
      guardarTarea({
          ...tarea,
          [e.target.name]:e.target.value
      })
  }
  // Funcion cuando se envie el form de tarea
  const onSubmit = (e) =>{
    e.preventDefault();

    //Validando el formulario
    if(nombre.trim()===''){
        validarTarea();
        return;
    }

    //Revisando si se edita o se agrega una tarea 
    if(tareaSeleccionada===null){
      //Agregando la nueva tarea al state de tareas
      tarea.proyectoID = proyectoActual.id;
      tarea.estado=false;
      agregarTarea(tarea);
    }else{
      actualizarTarea(tarea); //Actualizar tarea existente
      
      limpiarTarea(); //Limpia la tarea seleccionada del state
    }

    //Obtener las tareas y filtrarlas (proyecto actual)
    obtenerTareas(proyectoActual.id)

    //Reiniciar el form
    guardarTarea({
        nombre:''
    })
  }

  return (
    <div className="formulario">
      <form
        onSubmit={onSubmit}
      >
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            onChange={handleChange}
            value={nombre}
            name="nombre"
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario byn-submit btn-block"
            value={tareaSeleccionada ? 'Editar Tarea' : "Agregar Tarea"}
          />
        </div>
      </form>
      {errorTarea ?<p className="mensaje error">El nombre de la tarea es obligatorio</p> :null}
    </div>
  );
};

export default FormTarea;
