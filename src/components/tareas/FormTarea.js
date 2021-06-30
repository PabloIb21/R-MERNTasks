import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    // extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // obtener la funcion de context de agregar tarea
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    // effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada)
        }else{
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada]);

    // state del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    });

    // extraer el nombre de la tarea
    const {nombre} = tarea;

    // si no hay proyecto seleccionado
    if(!proyecto) return null;

    // array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        // validar
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        // si es edicion o nueva tarea
        if(tareaseleccionada === null){
            // agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        }else{
            // actualizar tarea existente
            actualizarTarea(tarea);

            // elimina tarea seleccionada del state
            limpiarTarea();
        }

        // obtener y filtrar tareas del proyecto actual
        obtenerTareas(proyectoActual._id);

        // reiniciar el form
        guardarTarea({
            nombre: ''
        });
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
                        name="nombre"
                        onChange={handleChange}
                        value={nombre}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
                {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
            </form>
        </div>
    );
};

export default FormTarea;