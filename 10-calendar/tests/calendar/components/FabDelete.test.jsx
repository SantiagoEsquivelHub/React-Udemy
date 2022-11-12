import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux";
import { FabDelete } from "../../../src/calendar/components/FabDelete"
import { store } from "../../../src/store";

describe('Pruebas en el componente <FabDelete />', () => {
    test('debe de mostrar el componente correctamente', () => {

        //Enzyme assesses the individual behavior, however, React Testing Library assesses the result after any events. 

        //TODO: Incomplete Test

        render(
            <Provider store={store}>
                <FabDelete />
            </Provider>
        );
        screen.debug()
    })
})