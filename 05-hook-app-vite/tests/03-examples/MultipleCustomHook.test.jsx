import { MultipleCustomHooks } from "../../src/03-examples";
import '@testing-library/jest-dom';  // importacion del jest para snippets
import { fireEvent, render, screen } from '@testing-library/react';
import { useFetch } from "../../src/hooks/useFetch";
import { useCounter } from "../../src/hooks/useCounter";

jest.mock('../../src/hooks/useFetch');
jest.mock('../../src/hooks/useCounter');


describe('Pruebas en <MultipleCustomHook />', () => {

    const mockIncrement = jest.fn();

    useCounter.mockReturnValue({
        counter: 1,
        increment: mockIncrement
    });

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('debe de mostrar el componente por defecto', () => {

        /* const wrapper = shallow(<MultipleCustomHooks />);
        expect(wrapper).toMatchSnapshot(); 
        enzyme import shallow
        */

        useFetch.mockReturnValue({
            data: null,
            isLoading: true,
            hasError: null
        })

        render(<MultipleCustomHooks />);
        //screen.debug();

        expect(screen.getByText('Loading...'));
        expect(screen.getByText('Breaking Bad Quotes'));

        const nextButton = screen.getByRole('button', { name: 'Next quote' })

        expect(nextButton.disabled).toBeTruthy();

    })

    test('debe de mostrar un Quote', () => {

        useFetch.mockReturnValue({
            data: [{ author: 'Santiago', quote: 'La noche no es unánime, es magnánima' }],
            isLoading: false,
            hasError: null
        })

        render(<MultipleCustomHooks />);
        //screen.debug();

        expect(screen.getByText('La noche no es unánime, es magnánima')).toBeTruthy();
        expect(screen.getByText('Santiago')).toBeTruthy();

        const nextButton = screen.getByRole('button', { name: 'Next quote' })

        expect(nextButton.disabled).toBeFalsy();

    })

    test('debe de llamar la funcion de incrementar', () => {

        useFetch.mockReturnValue({
            data: [{ author: 'Santiago', quote: 'La noche no es unánime, es magnánima' }],
            isLoading: false,
            hasError: null
        })



        render(<MultipleCustomHooks />);

        const nextButton = screen.getByRole('button', { name: 'Next quote' })

        fireEvent.click(nextButton);
        //screen.debug();


        expect(mockIncrement).toHaveBeenCalled();

    })

})