import firebase from "firebase";

const config = require("./firebase-config.json");

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseDB = firebase.database;
export const firebaseAuth = firebase.auth;
