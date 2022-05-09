import PrimeraApp from "../PrimeraApp";
import '@testing-library/jest-dom';
import {shallow} from 'enzyme';
import React from 'react';


describe('Pruebas en PrimeraApp', () => {

    /* test('Debe mostrar el mensaje "Hola, soy Santi"', () => {

        const saludo = "Hola, soy Santi"
        const wrapper = render(<PrimeraApp saludo={saludo}/>)

        expect(wrapper.getByText(saludo)).toBeInTheDocument();
        
    }) */

    test('Debe mostrar el mensaje "Hola, soy Santi"', () => {

        const saludo = "Hola, soy Santi"
        const wrapper = shallow(<PrimeraApp saludo={saludo}/>);
        
        expect(wrapper).toMatchSnapshot()
        
    })

})