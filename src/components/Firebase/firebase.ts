import { addDays, format } from "date-fns";
import app, { User } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/performance";
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
        app.performance();

        this.auth = app.auth();
        this.firestore = app.firestore();

        if (process.env.NODE_ENV !== "development") {
            this.firestore.enablePersistence();
        }
    }

    createAccount = (email: string, password: string) => this.auth.createUserWithEmailAndPassword(email, password);

    login = (email: string, password: string) => this.auth.signInWithEmailAndPassword(email, password);

    logout = () => this.auth.signOut();

    getSubjectsCollection = (user: User) =>
        this.firestore
            .collection("users")
            .doc(user.uid)
            .collection("subjects");

    getSubjectDoc = (user: User, id: string) => this.getSubjectsCollection(user).doc(id);

    createSubject = (user: User, name: string) =>
        this.getSubjectsCollection(user).add(<Omit<Subject, "id">>{
            name,
            cardsCount: 0,
            cardsPhase: {},
            cardsNextQuiz: {},
            aggregatedEvents: []
        });

    deleteSubject = (user: User, subjectId: string) => this.getSubjectDoc(user, subjectId).delete();

    getCardsCollection = (user: User, subjectId: string) => this.getSubjectDoc(user, subjectId).collection("cards");

    getCardDoc = (user: User, subjectId: string, cardId: string) => this.getCardsCollection(user, subjectId).doc(cardId);

    createCard = (user: User, subjectId: string, card: Pick<Card, "question" | "answer" | "remark">) =>
        this.getCardsCollection(user, subjectId).add(<Omit<Card, "id">>{
            ...card,
            phase: 1,
            nextQuiz: format(new Date(), "YYYY-MM-DD"),
            createdAt: format(new Date(), "YYYY-MM-DD"),

            createdTimestamp: Date.now(),
            updatedTimestamp: Date.now()
        });

    updateCard = (user: User, subjectId: string, card: Pick<Card, "id" | "question" | "answer" | "remark">) =>
        this.getCardsCollection(user, subjectId)
            .doc(card.id)
            .update(card);

    deleteCard = (user: User, subjectId: string, cardId: string) => this.getCardDoc(user, subjectId, cardId).delete();

    updatePhase = (user: User, subjectId: string, cardId: string, phase: number) => {
        let nextQuiz: string | null;
        switch (phase) {
            default:
            case 1:
                nextQuiz = format(new Date(), "YYYY-MM-DD");
                break;
            case 2:
                nextQuiz = format(addDays(new Date(), 3), "YYYY-MM-DD");
                break;
            case 3:
                nextQuiz = format(addDays(new Date(), 10), "YYYY-MM-DD");
                break;
            case 4:
                nextQuiz = format(addDays(new Date(), 30), "YYYY-MM-DD");
                break;
            case 5:
                nextQuiz = format(addDays(new Date(), 90), "YYYY-MM-DD");
                break;
            case 6:
                nextQuiz = null;
                break;
        }

        return this.getCardDoc(user, subjectId, cardId).update(<Partial<Card>>{
            phase: phase,
            nextQuiz: nextQuiz,
            updatedTimestamp: Date.now()
        });
    };

    importCards = (user: User, subjectId: string, cards: Omit<Card, "id">[]) => {
        const collection = this.getCardsCollection(user, subjectId);
        const batch = this.firestore.batch();
        for (const card of cards) {
            batch.set(collection.doc(), card);
        }
        return batch.commit();
    };
}
