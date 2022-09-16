import { useLayoutEffect, useRef, useState } from 'react'

export const Quote = ({ author, quote }) => {

    const pRef = useRef();

    const [boxSize, setBoxSize] = useState({
        width: 0,
        height: 0,
    })

    /*Cuando se rendericen todos los elementos del DOM, se renderiza esto*/
    useLayoutEffect(() => {

        /* objeto que trae informacion sobre el tamaño relativo a la posicion del viewport */
        const { width, height } = pRef.current?.getBoundingClientRect();

        setBoxSize({
            width,
            height,
        })

    }, [quote])


    return (
        <>
            <blockquote
                className='blockquote text-end'
                style={{ display: 'flex' }}
            >
                <p ref={pRef} className='mb-1'>{quote}</p>
                <footer className='blockquote-footer'>{author}</footer>
            </blockquote>
            {/* pasamos el objeto JSON a string */}
            <code>{JSON.stringify(boxSize)}</code>
        </>
    )
}
