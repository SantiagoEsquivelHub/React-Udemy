
import '@testing-library/jest-dom';  // importacion del jest para snippets
import { shallow } from 'enzyme'; // importacion del enzyme
import { GifGridItem } from '../../components/GifGridItem';

describe('Pruebas del componente GifGridItem', () => {

    const title = 'Un titulo';
    const url = 'https://localhost/algo.jpg';
    const wrapper = shallow(<GifGridItem title={title} url={url} />);


    test('Debe mostrar el componente correctamente', () => {

        expect(wrapper).toMatchSnapshot();
    });

    test('Debe tener un parrafo con el title', () => {

        const parrafo = wrapper.find('p');
        expect(parrafo.text().trim()).toBe(title);

    });

    test('Debe tener la imagen igual al url y alt de los props', () => {

        const img = wrapper.find('img');
        /* console.log(img.prop('src')); */
        expect(img.prop('src')).toBe(url);
        expect(img.prop('alt')).toBe(title);

    });

    test('Debe tener la imagen igual al url y alt de los props', () => {

        const div = wrapper.find('div');
        const className = div.prop('className');
         console.log(div.prop('className'));
        expect(className.includes("animate__fadeIn")).toBe(true);

    });
})