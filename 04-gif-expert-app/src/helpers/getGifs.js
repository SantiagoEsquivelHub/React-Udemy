import React from 'react'

export const getGifs = async (caterogy) => {


    const url = `https://api.giphy.com/v1/gifs/search?q=${encodeURI(caterogy)}&limit=10&api_key=idsHuhXipeuoqf2JEWVaUWaLRkCwt1IK`;
    const resp = await fetch(url);
    const { data } = await resp.json();


    const gifs = data.map(img => {

        return {
            id: img.id,
            title: img.title,
            url: img.images?.downsized_medium.url
        }


    });

    return gifs;
};
