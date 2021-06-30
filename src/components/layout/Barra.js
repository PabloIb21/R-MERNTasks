import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import ProyectoContext from '../../context/proyectos/proyectoContext';

const Barra = () => {

    // extraer la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

    // extrar la información de proyectos
    const proyectoContext = useContext(ProyectoContext);
    const { limpiarProyectoActual } = proyectoContext;

    useEffect(() => {
        usuarioAutenticado();

        // eslint-disable-next-line
    }, []);

    const logout = () => {
        cerrarSesion();
        limpiarProyectoActual();
    }

    return (
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p> : null}

            <nav className="nav-principal">
                <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={logout}
                >Cerrar Sesión</button>
            </nav>
        </header>
    );
};

export default Barra;