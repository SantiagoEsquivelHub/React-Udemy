import { async } from "@firebase/util";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setImgsToActiveNote, setNotes, setSaving, updateNotes } from "./journalSlice";


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
            imgsUrls: []
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

        const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true });


        dispatch(updateNotes(note));

    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {

        dispatch(setSaving());

        //Arreglo de promesas
        const fileUploadPromises = [];

        /* LLenamos el arreglo de promesas con la correspondiente de cada file del arreglo
        para luego ejecutarlas todas juntas */

        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        const imgsUrls = await Promise.all(fileUploadPromises);
        dispatch(setImgsToActiveNote(imgsUrls));

    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));

    }
}