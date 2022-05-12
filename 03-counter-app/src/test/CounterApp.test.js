import CounterApp from "../CounterApp"; //importacion de componente
import '@testing-library/jest-dom';  // importacion del jest para snippets
import { shallow } from 'enzyme'; // importacion del enzyme
import React from 'react'; // importacion del react


describe('Pruebas en CounterApp', () => {

    let wrapper = shallow(<CounterApp />);

    beforeEach(() => {
        wrapper = shallow(<CounterApp />);
    });


    test('Debe mostrar el CounterApp correctamente', () => {

        expect(wrapper).toMatchSnapshot()

    });

    test('Debe mostrar el value enviado por props en defecto"', () => {

        const numeroDefecto = 100;
        const wrapper = shallow(<CounterApp value={numeroDefecto} />);

        const numeroValue = wrapper.find('h2').text().trim(); //documento.querySelector();
        expect(numeroValue).toBe('100');

    });

    test('Debe de incrementar el contador al hacer click en el boton de +1"', () => {


        wrapper.find('button').at(0).simulate('click');
        const counterMasText = wrapper.find('h2').text().trim();

        expect(counterMasText).toBe('11');
    });

    test('Debe de disminuir el contador al hacer click en el boton de -1"', () => {


        wrapper.find('button').at(2).simulate('click');
        const counterMenosText = wrapper.find('h2').text().trim();

        expect(counterMenosText).toBe('9');
    });

    test('Debe de reiniciar el contador al hacer click en el boton de Reset"', () => {

        const wrapper = shallow(<CounterApp value={120} />);
        wrapper.find('button').at(0).simulate('click');
        wrapper.find('button').at(0).simulate('click');
        wrapper.find('button').at(0).simulate('click');
        wrapper.find('button').at(2).simulate('click');
        wrapper.find('button').at(1).simulate('click');
        const counterResetText = wrapper.find('h2').text().trim();

        expect(counterResetText).toBe('120');
    });


})