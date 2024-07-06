import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAkD4dJoTmpZzOA7UuY8FP-Cw2N34rvEc8",
  authDomain: "my-journal-30487.firebaseapp.com",
  projectId: "my-journal-30487",
  storageBucket: "my-journal-30487.appspot.com",
  messagingSenderId: "714556161687",
  appId: "1:714556161687:web:03047cdfde68f84e1ef3d2"
};

const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(app);
const auth = getAuth(app);

export { firestoreDb, auth };