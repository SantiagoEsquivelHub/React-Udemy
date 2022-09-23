import { TodoItem } from "../../src/08-useReducer/TodoItem";
import { fireEvent, render, screen } from '@testing-library/react';

describe('Pruebas en el componente <TodoItem />', () => {

    const todo = {
        id: 1,
        description: 'Comprar pan',
        done: false
    }

    const onDeleteTodoMock = jest.fn();
    const onToggleTodoMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks(); //limpiar funciones
    })

    test('debe de mostrar el todo pendiente de completar', () => {

        render(
            <TodoItem
                id={todo.id}
                description={todo.description}
                done={todo.done}
                onDeleteTodo={onDeleteTodoMock}
                onToggleTodo={onToggleTodoMock}
            />
        );

        //screen.debug();

        const liElement = screen.getByRole('listitem');
        const spanElement = screen.getByLabelText('span');


        expect(liElement.className).toBe('list-group-item d-flex justify-content-between');
        /*  expect(spanElement.className).toBe('align-self-center'); error por espacio al final */
        expect(spanElement.className).toContain('align-self-center');
        expect(spanElement.className).not.toContain('text-decoration-line-through');

    })

    test('debe de mostrar el todo completado', () => {

        todo.done = true;

        render(
            <TodoItem
                id={todo.id}
                description={todo.description}
                done={todo.done}
                onDeleteTodo={onDeleteTodoMock}
                onToggleTodo={onToggleTodoMock}
            />
        );

        //screen.debug();

        const spanElement = screen.getByLabelText('span');

        expect(spanElement.className).toContain('text-decoration-line-through');

    })

    test('span debe de llamar el ToggleTodo cuando se hace click', () => {

        render(
            <TodoItem
                id={todo.id}
                description={todo.description}
                done={todo.done}
                onDeleteTodo={onDeleteTodoMock}
                onToggleTodo={onToggleTodoMock}
            />
        );

        const spanElement = screen.getByLabelText('span');
        fireEvent.click(spanElement);

        expect(onToggleTodoMock).toHaveBeenCalledWith(todo.id);

    })

    test('button debe de llamar el DeleteTodo cuando se hace click', () => {

        render(
            <TodoItem
                id={todo.id}
                description={todo.description}
                done={todo.done}
                onDeleteTodo={onDeleteTodoMock}
                onToggleTodo={onToggleTodoMock}
            />
        );

        screen.debug()

        const btnDelete = screen.getByRole('button');
        fireEvent.click(btnDelete);

        expect(onDeleteTodoMock).toHaveBeenCalledWith(todo.id);

    })

})