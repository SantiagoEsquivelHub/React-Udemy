import { useState } from "react";

export const useCounter = (initialValue = 10) => {

    const [counter, setCounter] = useState(initialValue);

    const increment = (value = 1) => {
        setCounter(counterCurrent => counterCurrent + value);
    }

    const decrement = (value = 1) => {
        setCounter(counterCurrent => counterCurrent - value);
    }

    const reset = (value = 1) => {
        setCounter(initialValue);
    }

    return {
        counter,
        increment,
        decrement,
        reset
    }
}