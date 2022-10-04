import { useState } from 'react';
import { useGetTodoByIdQuery, useGetTodosQuery } from './store/slices/todos/api'

export const TodoApp = () => {

    const [todoId, setTodoId] = useState(1);

    // const { isLoading, data: todos = [] } = useGetTodosQuery()
    const { isLoading, data: todo } = useGetTodoByIdQuery(todoId);

    const nextTodo = () => {
        setTodoId(todoId + 1)
    }

    const prevTodo = () => {
        if (todoId === 1) return;
        setTodoId(todoId - 1)
    }

    return (
        <>
            <h1>Todos - RTK Query</h1>
            <hr />

            <h4>Loading: {isLoading ? 'true' : 'false'}</h4>

            <pre>
                {
                    JSON.stringify(todo)
                }
            </pre>

            <button onClick={prevTodo}>
                Prev Todo
            </button>

            <button onClick={nextTodo}>
                Next Todo
            </button>

            {/*  <ul>
                {
                    todos.map(todo => (
                        <li key={todo.id}>
                            <strong>{todo.completed ? 'DONE: ' : 'Pending: '}</strong>
                            {todo.title}
                        </li>
                    ))
                }
            </ul> */}

        </>
    )
}
