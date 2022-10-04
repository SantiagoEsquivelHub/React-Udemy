import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons, pokemonSlice } from './store/slices/pokemon'

export const PokemonApp = () => {

    const { isLoading, nextPage, pokemons } = useSelector(state => state.pokemon)


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemons());
    }, [])




    return (
        <>
            <h1>PokemonApp</h1>
            <hr />

            <span>Loading: {isLoading ? 'true' : 'false'}</span>
            <ul>
                {
                    pokemons?.map(pokemon => (
                        <li>{pokemon.name}</li>
                    ))
                }
            </ul>

            <button
                disabled={isLoading}
                onClick={() => dispatch(getPokemons(nextPage))}
            >
                Next
            </button>
        </>
    )
}
