import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { HeroPage } from "../../../src/heroes/views/HeroPage"
import { MarvelPage } from "../../../src/heroes/views/MarvelPage";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUseNavigate
}))

describe('Pruebas en <HeroPage />', () => {

    test('debe de mostrar la imagen de marvel-spider', () => {

        render(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path='hero/:id' element={<HeroPage />} />
                </Routes>
            </MemoryRouter>
        )

        //screen.debug();
        const imgHero = screen.getByRole('img');
        expect(imgHero.src).toContain('/assets/heroes/marvel-spider.jpg');

    })

    test('debe de navegar a la pagina anterior si se le hace click al boton de regresar', () => {

        render(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path='hero/:id' element={<HeroPage />} />
                </Routes>
            </MemoryRouter>
        )

        //screen.debug();
        const btnBack = screen.getByRole('button');
        fireEvent.click(btnBack);
        expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
    })

    test('debe de navegar a la pagina de /marvel si se detecta el id de un heroe no existente', () => {

        const { container } = render(
            <MemoryRouter initialEntries={['/hero/marvel-spider2']}>
                <Routes>
                    <Route path='hero/:id' element={<HeroPage />} />
                    <Route path='marvel' element={<MarvelPage />} />
                </Routes>
            </MemoryRouter>
        )

        //screen.debug();
        expect(container).toMatchSnapshot();
    })

})