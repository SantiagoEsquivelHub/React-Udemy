import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        savedMessage: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 12345,
        //     imageUrls: []
        // }

    },
    reducers: {
        addNewEmptyNote: (state, { payload }) => {
            state.notes.push(payload);
            state.isSaving = false;
        },
        setActiveNote: (state, { payload }) => {
            state.active = payload;

        },
        setNotes: (state, { payload }) => {
            state.notes = payload;
        },
        setSaving: (state, action) => {
            state.isSaving = true;
        },
        updateNotes: (state, action) => {

        },
        deleteNoteById: (state, action) => {

        },
        savingNewNote: (state) => {
            state.isSaving = true;
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNotes,
    deleteNoteById,
    savingNewNote
} = journalSlice.actions;