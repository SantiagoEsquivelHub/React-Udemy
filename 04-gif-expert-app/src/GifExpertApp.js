import React, { useState } from 'react';
import { AddCategory } from './components/AddCategory';
import { GifGrid } from './components/GifGrid';
import './index.css';

//const categories = ['One Punch', 'Samurai X', 'Dragon Ball'];

const GifExpertApp = () => {

    const [categories, setCategories] = useState(['Dragon Ball']);
    /*
        const handleAdd = () => {
            setCategories(cats => [...categories,'Minecraft']);
        } */



    return (
        <>
            <h2>GifExpertApp</h2>
            <hr />

            <AddCategory setCategories={setCategories} />
            <ol>
                {
                    categories.map(category => (
                        <GifGrid
                            key={category}
                            category={category}
                        />
                    ))
                }
            </ol>
        </>
    )
}

export default GifExpertApp