import React from 'react';
import '@testing-library/jest-dom';  // importacion del jest para snippets
import { shallow } from 'enzyme'; // importacion del enzyme
import { GifGrid } from '../../components/GifGrid';
import { useFetchGifs } from '../../hooks/useFetchGifs';
jest.mock('../../hooks/useFetchGifs'); //simular uso del custom hook useFetchGifs

describe('Pruebas en GifGrid', () => {

    const category = 'One Punch';

    test('Debe mostrar el componente correctamente', () => {
        useFetchGifs.mockReturnValue({
            data: [],
            loading: true
        })

        const wrapper = shallow(<GifGrid category={category} />)
        expect(wrapper).toMatchSnapshot();
    })

    test('Debe mostrar items cuando se cargan imagenes con useFetchGifs', () => {

        const gifs = [{
            id: 'ABC',
            url: 'https://localhost/cualquier/cosa.jpg',
            title: 'Cualquier cosa'
        }]

        useFetchGifs.mockReturnValue({
            data: gifs,
            loading: false
        })
        const wrapper = shallow(<GifGrid category={category} />)
        expect(wrapper).toMatchSnapshot();
    })

})