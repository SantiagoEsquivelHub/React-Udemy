import { collection, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNotes } from "./journalSlice";


export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote());


        //Obtenemos el uid de nuestro store
        const { uid } = getState().auth;

        //Generamos nuestra nota
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        //Guardamos la informacion de la nota en la base de datos
        const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`));

        //Esperamos la respuesta de la creacion de la nota
        await setDoc(newDoc, newNote);

        /*Si la nota fue creada con exito, asignamos a nuestro objeto con la informacion
        de la Notification, el id con el que fue asignada.*/
        newNote.id = newDoc.id;

        //Act
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));


    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        if (!uid) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));
    }
}

export const startSavingNotes = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFireStore = { ...note }
        delete noteToFireStore.id;

        console.log(noteToFireStore)

        const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true });


        dispatch(updateNotes(note));

    }
}