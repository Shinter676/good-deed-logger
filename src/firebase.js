import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, push, remove } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};

export const addSubmission = (userId, submission) => {
  const submissionsRef = ref(database, 'submissions/' + userId);
  return push(submissionsRef, submission);
};

export const getSubmissions = (userId) => {
  const submissionsRef = ref(database, 'submissions/' + userId);
  return get(submissionsRef);
};

export const updateScore = (userId, submissionId, score) => {
  const scoreRef = ref(database, `submissions/${userId}/${submissionId}/score`);
  return set(scoreRef, score);
};

export const getTotalScores = () => {
  return get(ref(database, 'totalScores'));
};

export const updateTotalScore = (userId, score) => {
  const scoreRef = ref(database, `totalScores/${userId}`);
  return set(scoreRef, score);
};

export { database, auth };