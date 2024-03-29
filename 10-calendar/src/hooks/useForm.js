import { useState } from "react";

export const useForm = (initialForm = {}) => {

    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({ target }) => {

        const { name, value } = target;

        setFormState({
            ...formState,
            [name]: value
        })

    }

    const handleReset = () => {
        setFormState(initialForm)
    }

    const onDateChanged = (event, changing) => {

        setFormState({
            ...formState,
            [changing]: event
        })
    }

    const onEventSelected = (calendarEvent) => {
        setFormState({
            ...calendarEvent,
        })
    }

    return {
        ...formState,
        formState,
        onInputChange,
        handleReset,
        onDateChanged,
        onEventSelected
    }

}