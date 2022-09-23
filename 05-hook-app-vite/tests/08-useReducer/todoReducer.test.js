import { todoReducer } from "../../src/08-useReducer/todoReducer"

//toEqual = por referencia, mismo espacio en memoria

describe('Pruebas en el todoReducer', () => {

    const initialState = [{
        id: 1,
        description: 'demo todo',
        done: false
    }];

    test('debe de regresar el estado inicial', () => {

        const newState = todoReducer(initialState, {});

        expect(newState).toBe(initialState);
    })


    test('debe de agregar un todo', () => {

        const action = {
            type: 'ADD_TODO',
            payload: {
                id: 2,
                description: 'new todo',
                done: false
            }
        }

        const newState = todoReducer(initialState, action);

        expect(newState.length).toBe(2); //contenido, no espacio en memoria
        expect(newState).toContain(action.payload); //contenido, no espacio en memoria

    })

    test('debe de eliminar un todo', () => {

        const action = {
            type: 'REMOVE_TODO',
            payload: 1
        }

        const newState = todoReducer(initialState, action);

        expect(newState.length).toBe(0);

    })

    test('debe realizar el toogle de un todo', () => {

        const action = {
            type: 'TOGGLE_TODO',
            payload: 1
        }

        const newState = todoReducer(initialState, action);
        const newState2 = todoReducer(newState, action);

        expect(newState[0].done).toBeTruthy();
        expect(newState2[0].done).toBeFalsy();

    })

})