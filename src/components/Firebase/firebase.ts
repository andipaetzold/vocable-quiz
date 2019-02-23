import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBCBb4968T7ijsYhI5cwcaiOmqL3xUD1GA",
  authDomain: "vocable-quiz.firebaseapp.com",
  projectId: "vocable-quiz"
};

export default class Firebase {
  auth: firebase.auth.Auth;
  firestore: firebase.firestore.Firestore;

  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.firestore = app.firestore();
  }

  createAccount = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  login = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  logout = () => this.auth.signOut();
}
