import React, { useEffect, useState } from 'react'
import { getGifs } from '../helpers/getGifs';
import { useFetchGifs } from '../hooks/useFetchGifs';
import { GifGridItem } from './GifGridItem';

export const GifGrid = ( {category} ) => {
 
/* 
    const [images, setImages] = useState([]);
   

    useEffect(() => {

        getGifs(category)
        .then(imgs => setImages(imgs));

    }, [category])
 */


    const {data:images, loading} = useFetchGifs(category);
    
    return (
        <>
            <h3>{category}</h3>

            {loading && <p className='card animate__animated animate__flash'>Loading...</p>}

            <div className='card-grid'>

                {
                    images.map((img) => (
                        <GifGridItem key={img.id} {...img} />
                    ))
                }

            </div>
        </>
    )
}
