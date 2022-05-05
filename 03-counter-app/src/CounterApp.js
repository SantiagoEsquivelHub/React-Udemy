import React from 'react'
import PropTypes from 'prop-types'
import './index.css';

const CounterApp = ({value}) => {
    return (
        <>
            <h1>CounterApp</h1>
            <h2> {value} </h2>
        </>
    );
}

CounterApp.propTypes = {
value: PropTypes.number.isRequired
}


export default CounterApp;