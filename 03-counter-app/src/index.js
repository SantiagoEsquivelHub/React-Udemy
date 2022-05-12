import React from 'react';
import ReactDOM from 'react-dom';
import CounterApp from './CounterApp';
import PrimeraApp from './PrimeraApp';


const saludo = <h1>Hola Santi</h1>;
const divRoot = document.getElementById("root");

//Se hace la referencia al divRoot
//ReactDOM.render(<PrimeraApp />, divRoot);
ReactDOM.render(<CounterApp value={100}/>, divRoot);
//Se renderiza el JSX en esa referencia
/* root.render(<CounterApp value={10} />); */





