import firebase, { auth, provider } from "firebase";
//import {auth} from "firebase/auth"

const config = {
  apiKey: "AIzaSyD8fVmqqb4YTHQmk35uFObv7Pg4mklRbgE",
  authDomain: "ff4v-ac195.firebaseapp.com",
  databaseURL: "https://ff4v-ac195.firebaseio.com",
  projectId: "ff4v-ac195",
  storageBucket: "ff4v-ac195.appspot.com",
  messagingSenderId: "584730277588"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
