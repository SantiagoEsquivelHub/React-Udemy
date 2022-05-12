import React, { useState } from 'react';
import AddCategory from './components/AddCategory';
import './index.css';

//const categories = ['One Punch', 'Samurai X', 'Dragon Ball'];

const GifExpertApp = () => {

    const [categories, setCategories] = useState(['One Punch', 'Samurai X', 'Dragon Ball']);
    /*
        const handleAdd = () => {
            setCategories(cats => [...categories,'Minecraft']);
        } */



    return (
        <>
            <h2>GifExpertApp</h2>
            <hr />

            {/*             <button onClick={handleAdd}>Agregar</button> */}
            <AddCategory setCategories={setCategories}/>
            <ol>
                {
                    categories.map(category => {
                        return <li key={category}>{category}</li>
                    })
                }
            </ol>
        </>
    )
}

export default GifExpertApp