import { useForm } from "../../src/hooks/useForm";
import { renderHook } from '@testing-library/react';
import { act } from "react-dom/test-utils";

describe('Pruebas en el useForm', () => {

    const initialForm = {
        name: 'Santiago',
        email: 'santi@gmail.com'
    }


    test('debe de regresar los valores por defecto', () => {

        const { result } = renderHook(() => useForm(initialForm));

        expect(result.current).toEqual({
            name: initialForm.name,
            email: initialForm.email,
            formState: initialForm,
            onInputChange: expect.any(Function),
            handleReset: expect.any(Function),
        })
    })

    test('debe de cambiar el nombre del formulario', () => {

        const newValue = 'Isa';

        const { result } = renderHook(() => useForm(initialForm));
        const { onInputChange } = result.current;

        act(() => {
            onInputChange({
                target: {
                    name: 'name',
                    value: newValue
                }
            });
        })

        expect(result.current.name).toBe(newValue);
        expect(result.current.formState.name).toBe(newValue);
    })

    test('debe de realizar el reset del formulario', () => {

        const newValue = 'Isa';

        const { result } = renderHook(() => useForm(initialForm));
        const { onInputChange, handleReset } = result.current;

        act(() => {
            onInputChange({
                target: {
                    name: 'name',
                    value: newValue
                }
            });
            handleReset();
        })

        expect(result.current.name).toBe(initialForm.name);
        expect(result.current.formState.name).toBe(initialForm.name);
    })

})