import app from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBCBb4968T7ijsYhI5cwcaiOmqL3xUD1GA",
  authDomain: "vocable-quiz.firebaseapp.com",
  projectId: "vocable-quiz"
};

export default class Firebase {
  auth: firebase.auth.Auth;

  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  createAccount = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  login = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  logout = () => this.auth.signOut();
}
