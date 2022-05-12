import PrimeraApp from "../PrimeraApp";
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import React from 'react';


describe('Pruebas en PrimeraApp', () => {

    /* test('Debe mostrar el mensaje "Hola, soy Santi"', () => {

        const saludo = "Hola, soy Santi"
        const wrapper = render(<PrimeraApp saludo={saludo}/>)

        expect(wrapper.getByText(saludo)).toBeInTheDocument();
        
    }) */

    test('Debe mostrar el mensaje "Hola, soy Santi"', () => {

        const saludo = "Hola, soy Santi"
        const wrapper = shallow(<PrimeraApp saludo={saludo} />);

        expect(wrapper).toMatchSnapshot()

    });

    test('Debe mostrar el subtitulo enviado por props"', () => {

        const saludo = "Hola, soy Santi"
        const subtitulo = "Soy un subtitulo";
        const wrapper = shallow(<PrimeraApp saludo={saludo} subtitulo={subtitulo} />);

        const textoParrafo = wrapper.find('p').text(); //documento.querySelector();
        expect(textoParrafo).toBe(subtitulo);

    });

})