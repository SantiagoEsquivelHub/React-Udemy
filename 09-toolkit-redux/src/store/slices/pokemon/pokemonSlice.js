import { createSlice } from '@reduxjs/toolkit';

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        nextPage: 0,
        pokemons: [],
        isLoading: false,
    },
    reducers: {
        startLoadingPokemons: (state, /* action */) => {
            state.isLoading = true;
        },
        setPokemons: (state, action) => {            
            state.isLoading = false;
            state.nextPage = action.payload.nextPage;
            state.pokemons = action.payload.pokemons;
        },
    }
});


// Action creators are generated for each case reducer function
export const { startLoadingPokemons, setPokemons } = pokemonSlice.actions;