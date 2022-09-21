
const initialState = [{
    id: 1,
    toDo: 'Comprar pan',
    done: false
}]

//Funcion pura que retona un nuevo estado
const toDoReducer = (state = initialState, action = {}) => {

    if (action.type === 'CAMBIAR_INITIAL_STATE') {
        return [...state, action.payload]
    }

    return state;
}

let toDos = toDoReducer();

const newToDo = {
    id: 2,
    toDo: 'Comprar leche',
    done: false
}

const addToDoAction = {
    type: 'CAMBIAR_INITIAL_STATE',
    payload: newToDo
}


toDos = toDoReducer(toDos, addToDoAction);
