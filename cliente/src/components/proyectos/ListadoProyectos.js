import React, { useContext,useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoProyectos = () => {

    // Extrer proyectos del state inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyectos,obtenerProyectos } = proyectosContext;

    //Obtener proyectos cuando carga el componente
    useEffect(() => {
        obtenerProyectos()
        //eslint-disable-next-line
    }, [])
    
    //se revisa si hay proyectos en el state
    // Cuando se inicia la pagina y no hay proyectos en la bd se retorna un null
    if(proyectos.length ===0) return <p>No hay proyectos, parece que un alien se los llevó :c, Crea uno!</p>;
    
   
    return ( 
        <ul className="listado-proyectos">
            <TransitionGroup>
            {proyectos.map(proyecto=>(
                <CSSTransition
                    key={proyecto.id}
                    timeout={900}
                    classNames="proyecto"
                >
                    <Proyecto proyecto={proyecto}/>
                </CSSTransition>
            ))}
            </TransitionGroup>
        </ul>
    );
}
 
export default ListadoProyectos;