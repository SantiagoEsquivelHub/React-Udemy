// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyCpzY7-eG_lF0akHK2Fo0GRlSerlwUsRug",
    authDomain: "journalapp-8b365.firebaseapp.com",
    projectId: "journalapp-8b365",
    storageBucket: "journalapp-8b365.appspot.com",
    messagingSenderId: "185235316767",
    appId: "1:185235316767:web:c9e6bd48bd5f2159a2752a"
};

export const firebaseApp = initializeApp(firebaseConfig); //inicializar firebase
export const firebaseAuth = getAuth(firebaseApp); //funcionalidades de autenticacion
export const firebaseDB = getFirestore(firebaseApp); //configuracion de base de datos

