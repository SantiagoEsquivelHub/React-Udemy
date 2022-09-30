import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom"
import { SearchPage } from "../../../src/heroes/views/SearchPage"

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}))

describe('Pruebas en <SearchPage />', () => {

    beforeEach(
        () => jest.clearAllMocks()
    )

    test('debe de mostarse correctamente con los valores por defecto', () => {


        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )

        //screen.debug();
        expect(container).toMatchSnapshot();
    })

    test('debe de mostarse a batman y el input con el valor del queryString', () => {


        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox');
        const imgHero = screen.getByRole('img');
        const search_heroe = screen.getByLabelText('search_heroe');

        expect(input.value).toBe('batman');
        expect(search_heroe.style.display).toBe('none');
        expect(imgHero.src).toContain('/assets/heroes/dc-batman.jpg');

    })

    test('debe de mostrar un error si no se encuentra el hero (batman123)', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        )

        const error_search_heroe = screen.getByLabelText('error_search_heroe');
        expect(error_search_heroe.style.display).toBe('');

    })

    test('debe de llamar el navigate a la pantalla nueva', () => {

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { name: 'searchText', value: 'superman' } })

        console.log("input", input.value)


        const form = screen.getByRole('form');
        fireEvent.submit(form);

        expect(mockedUseNavigate).toHaveBeenCalledWith('?q=superman');
    })
})