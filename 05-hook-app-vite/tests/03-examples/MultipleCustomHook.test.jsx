import { MultipleCustomHooks } from "../../src/03-examples";
import '@testing-library/jest-dom';  // importacion del jest para snippets
import { render, screen } from '@testing-library/react';
describe('Pruebas en <MultipleCustomHook />', () => {

    test('debe de mostrar el componente por defecto', () => {

        /* const wrapper = shallow(<MultipleCustomHooks />);
        expect(wrapper).toMatchSnapshot(); 
        enzyme import shallow
        */

        render(<MultipleCustomHooks />);
        //screen.debug();

        expect(screen.getByText('Loading...'));
        expect(screen.getByText('Breaking Bad Quotes'));

        const nextButton = screen.getByRole('button', { name: 'Next quote' })

        expect(nextButton.disabled).toBeTruthy();
        


    })
})