import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDhiu77FtCcM8zgDbZ7Ntn3ZpQfz646EJU",
  authDomain: "chemy-x-story.firebaseapp.com",
  projectId: "chemy-x-story",
  storageBucket: "chemy-x-story.appspot.com",
  messagingSenderId: "902869778520",
  appId: "1:902869778520:web:42b0347e23676a16434a2d",
  measurementId: "G-VFQFPRPVSP",
  databaseURL: "https://chemy-x-story.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const analytics = getAnalytics(app);