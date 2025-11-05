import { initializeApp, getApps } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: import.meta.env.API_KEY,

  authDomain: import.meta.env.AUTH_DOMAIN,

  projectId: import.meta.env.PROJECT_ID,

  storageBucket: import.meta.env.STORAGE_BUCKET,

  messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,

  appId: import.meta.env.APP_ID,
};

// Initialize Firebase
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// const db = getFirestore();

const auth = getAuth(app);
connectAuthEmulator(auth, "http://127.0.0.1:9099", {
  disableWarnings: true,
});

const db = getFirestore(app);

connectFirestoreEmulator(db, "127.0.0.1", 8080);

const provider = new GoogleAuthProvider();
// Initialize Cloud Firestore and get a reference to the service

// connectFirestoreEmulator(db, "127.0.0.1", 8081);
// const FIREBASE_CONNECTED = "FIREBASE_CONNECTED";
// function startEmulators() {
//   if (!global[FIREBASE_CONNECTED]) {
//     global[FIREBASE_CONNECTED] = true;

//   }
// }
export { app, auth, provider, db };
