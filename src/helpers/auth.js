import { firebaseAuth, googleProvider } from "../configs/constants";

export const loginWithGoogle = () =>
  firebaseAuth().signInWithRedirect(googleProvider);

export const logout = () => firebaseAuth().signOut();
