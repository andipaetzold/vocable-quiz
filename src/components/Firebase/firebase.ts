import app, { User } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Card from "types/Card";
import Subject from "types/Subject";
import { Omit } from "utility-types";

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

  getSubjectsCollection = (user: User) =>
    this.firestore
      .collection("users")
      .doc(user.uid)
      .collection("subjects");

  getSubjectDoc = (user: User, id: string) =>
    this.getSubjectsCollection(user).doc(id);

  createSubject = (user: User, name: string) =>
    this.getSubjectsCollection(user).add(<Subject>{
      name
    });

  deleteSubject = (user: User, subjectId: string) =>
    this.getSubjectDoc(user, subjectId).delete();

  getCardsCollection = (user: User, subjectId: string) =>
    this.getSubjectDoc(user, subjectId).collection("cards");

  getCardDoc = (user: User, subjectId: string, cardId: string) =>
    this.getCardsCollection(user, subjectId).doc(cardId);

  createCard = (
    user: User,
    subjectId: string,
    card: Pick<Card, "question" | "answer">
  ) =>
    this.getCardsCollection(user, subjectId).add(<Omit<Card, "id">>{
      ...card,
      phase: 1
    });

  deleteCard = (user: User, subjectId: string, cardId: string) =>
    this.getCardDoc(user, subjectId, cardId).delete();
}
