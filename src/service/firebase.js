import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

try {
  initializeApp({
    apiKey: 'AIzaSyCU8pCUXNhEvA24HZnPwdeNau1gh4cx2Cg',
    authDomain: 'to-do-ba0e3.firebaseapp.com',
    databaseURL: 'https://to-do-ba0e3.firebaseio.com', // maybe delete
    projectId: 'to-do-ba0e3',
    storageBucket: 'to-do-ba0e3.appspot.com',
    messagingSenderId: '687129504076',
    appId: '1:687129504076:web:a056eca59ff89df9dc47e9',
    measurementId: 'G-GYGT9WRX47',
  });
} catch (error) {
  if (!/already exists/u.test(error.message)) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

const auth = getAuth();
const provider = new GoogleAuthProvider();

auth.useDeviceLanguage();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export const fb = {
  auth: {
    auth,
    provider,
  },
  firestore: getFirestore(),
};
