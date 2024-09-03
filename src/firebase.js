import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDhiu77FtcM8zgDb7ZNtn3ZpQfz646E3U",
  authDomain: "chemy-x-story.firebaseapp.com",
  projectId: "chemy-x-story",
  storageBucket: "chemy-x-story.appspot.com",
  messagingSenderId: "902869778520",
  appId: "1:902869778520:web:42b0347e23676a16434a2d",
  measurementId: "G-VFQFPRPV5P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);