/* import React, { Fragment } from 'react'; */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './index.css';

//Functional Components

const PrimeraApp = ({saludo, subtitulo}) => {

    //const saludo = 'Hola mundo';


    return (
        /* Fragment que nos permite agrupar una lista de elementos */
        <>
            <h1>{saludo}</h1>
            {/* <pre>{JSON.stringify(saludo, null,3)}</pre> */}
            <p>{subtitulo}</p>
        </>
    );

}


PrimeraApp.propTypes ={
    saludo: PropTypes.string.isRequired
}

PrimeraApp.defaultProps ={
    subtitulo: "Soy un subtitulo"
}

export default PrimeraApp;