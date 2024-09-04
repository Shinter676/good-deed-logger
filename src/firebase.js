import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDhiu77FtCcM8zgDbZ7Ntn3ZpQfz646EJU",
  authDomain: "chemy-x-story.firebaseapp.com",
  databaseURL: "https://chemy-x-story-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chemy-x-story",
  storageBucket: "chemy-x-story.appspot.com",
  messagingSenderId: "902869778520",
  appId: "1:902869778520:web:782dee9e254d9f5c434a2d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// กำหนด Collection
const submissionsCollection = collection(db, 'submissions');
const usersCollection = collection(db, 'users');

export { app, db, storage, auth, submissionsCollection, usersCollection };