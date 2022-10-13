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
            state.savedMessage = ``;
        },
        setNotes: (state, { payload }) => {
            state.notes = payload;
        },
        setSaving: (state, action) => {
            state.isSaving = true;
            state.savedMessage = ``;
        },
        updateNotes: (state, { payload }) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                return note.id === payload.id
                    ? payload
                    : note
            })

            state.savedMessage = `${payload.title}, actualizada correctamente`;
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