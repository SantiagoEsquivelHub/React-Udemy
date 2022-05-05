import React from 'react';
import ReactDOMClient from 'react-dom/client';
import CounterApp from './CounterApp';
//import PrimeraApp from './PrimeraApp';


const saludo = <h1>Hola Santi</h1>;
const divRoot = document.getElementById("root");

//Se hace la referencia al divRoot
const root = ReactDOMClient.createRoot(divRoot);

//Se renderiza el JSX en esa referencia
root.render(<CounterApp value={41} />);




