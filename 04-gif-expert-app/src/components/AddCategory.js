import React, { useState } from 'react'
import PropTypes from 'prop-types'


const AddCategory = ({ setCategories }) => {

    const [inputValue, setInputValue] = useState('');

    const handleCategory = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault(); //Evita el refresh de la pagina al hacer sl submit

        if (inputValue.trim().length > 2) {
            setCategories(cats => [...cats, inputValue]);
            setInputValue('');
        }
    }

    return (


        <form onSubmit={handleSubmit}>
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

export default AddCategory