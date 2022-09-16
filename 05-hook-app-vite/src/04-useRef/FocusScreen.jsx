import { useRef } from 'react'

export const FocusScreen = () => {

    const inputRef = useRef(); //mantener referencia hacia algo y que cuando la referencia cambie no se renderice la pagina

    const onClick = () => {
        inputRef.current?.select();
    }

    return (
        <div>
            <h1>Focus Screen</h1>
            <hr />

            <input
                ref={inputRef}
                type="text"
                placeholder='Ingrese su nombre'
                className='form-control'
            />

            <button
                className='btn btn-primary mt-2'
                onClick={onClick}
            >
                Set focus
            </button>
        </div>
    )
}
