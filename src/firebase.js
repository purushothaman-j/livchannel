import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRsu0742_9BgEHtFxfSH8lMDiAWKlVgec",
  authDomain: "live-chat-3e441.firebaseapp.com",
  projectId: "live-chat-3e441",
  storageBucket: "live-chat-3e441.appspot.com",
  messagingSenderId: "254463556682",
  appId: "1:254463556682:web:173b3f8c490b22c9ba7ab3",
  measurementId: "G-RX86YJ37SB",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
