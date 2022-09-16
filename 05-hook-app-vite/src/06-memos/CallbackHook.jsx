import { useCallback, useState } from 'react'
import { useCounter } from '../hooks'
import { ShowIncrement } from './ShowIncrement';

export const CallbackHook = () => {

    const [counter, setCounter] = useState(10);

    const incrementFather = useCallback(
        (value) => {
            setCounter(counter => counter + value);
        },
        [],
    )


    return (
        <div>
            <h1>useCallback Hook: {counter}</h1>
            <hr />

            <ShowIncrement increment={incrementFather} />
        </div>
    )
}
