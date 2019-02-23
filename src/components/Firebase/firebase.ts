import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Subject from "types/Subject";
import Card from "types/Card";

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

  getSubjectsCollection = (user: firebase.User) =>
    this.firestore
      .collection("users")
      .doc(user.uid)
      .collection("subjects");

  getSubjectDoc = (user: firebase.User, id: string) =>
    this.getSubjectsCollection(user).doc(id);

  createSubject = (user: firebase.User, name: string) =>
    this.getSubjectsCollection(user).add(<Subject>{
      name
    });

  createCard = (
    user: firebase.User,
    subjectId: string,
    card: Pick<Card, "question" | "answer">
  ) =>
    this.getSubjectDoc(user, subjectId)
      .collection("cards")
      .add(card);
}
