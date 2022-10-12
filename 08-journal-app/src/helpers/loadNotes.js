import { firebaseDB } from "../firebase/config";

export const loadNotes = async () => {
    const { uid } = getState().auth;

    if (!uid) throw new Error('El UID del usuario no existe');

    const collectionRef = collection(firebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const notes = [];

    docs.forEach(doc => {
        notes.push({
            id: doc.id,
            ...doc.data(),
        });
    });

    return notes;
};
