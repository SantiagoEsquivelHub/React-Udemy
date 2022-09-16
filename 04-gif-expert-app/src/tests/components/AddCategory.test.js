import React from 'react';
import { AddCategory } from "../../components/AddCategory";
import { shallow } from 'enzyme';
import '@testing-library/jest-dom';

describe('Pruebas en el componente AddCategory', () => {

    const setCategories = jest.fn();
    let wrapper;

    beforeEach(() => {
        //jest.clearAllMocks();
        wrapper = shallow(<AddCategory setCategories={setCategories} />);
    })

    test('Debe mostrar el componente correctamente', () => {

        expect(wrapper).toMatchSnapshot();

    });


    test('Debe de cambiar la caja de texto', () => {

        const input = wrapper.find('input'); //querySelector
        const value = "Hola mundo"; // definicion del value a mostrar cuando se active el evento onChange del componente 
        input.simulate('change', {
            target: { value }
        });

        const p = wrapper.find('p'); //referencia a elemento <p></p>

        expect(p.text().trim()).toBe(value);


    });


    test('NO debe de postear la informcion con Submit', () => {

        const form = wrapper.find('form');
        form.simulate('submit', { preventDefault() { } });

        expect(setCategories).not.toHaveBeenCalled();
    });

    test('Debe de llamar el setCategories y limpiar la caja de texto', () => {

        const value = "Hola mundo"; // definicion del value a mostrar cuando se active el evento onChange del componente 

        const input = wrapper.find('input'); //querySelector

        input.simulate('change', {  // Evento onChange
            target: { value }
        });  

        const form = wrapper.find('form');
        form.simulate('submit', { preventDefault() { } }); // Evento Submit 

        expect(setCategories).toHaveBeenCalled();
        expect(setCategories).toHaveBeenCalledTimes(1);
        expect(setCategories).toHaveBeenCalledWith(expect.any(Function));

        expect(wrapper.find('input').prop('value')).toBe('');


        });


})