import React, { useState } from 'react'
import PropTypes from 'prop-types'


export const AddCategory = ({ setCategories }) => {

    const [inputValue, setInputValue] = useState('');

    const handleCategory = (e) => {
        setInputValue(e.target.value);
        console.log('handleCategory llamado')
    }

    const handleSubmit = (e) => {
        e.preventDefault(); //Evita el refresh de la pagina al hacer sl submit
        console.log('handleSubmit llamado')

        if (inputValue.trim().length > 2) {
            setCategories(cats => [inputValue, ...cats]);
            setInputValue('');
        }
    }

    return (


        <form onSubmit={handleSubmit}>
            <p>{inputValue}</p>
            <input
                type="text"
                value={inputValue}
                onChange={handleCategory}
            />
        </form>



    )
}

AddCategory.propTypes = {
    setCategories: PropTypes.func.isRequired
}

