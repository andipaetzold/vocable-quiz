import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import Card from "../types/Card";
import Subject from "../types/Subject";

export const aggregateCardsSchedule = functions
    .runWith({ memory: "256MB" })
    .pubsub.schedule("0 0 * * *")
    .onRun(async () => {
        const snap = await firestore().collectionGroup("subjects").get();
        for (const doc of snap.docs) {
            await updateSubject(doc);
        }
    });

async function updateSubject(doc: firestore.DocumentSnapshot) {
    functions.logger.info(`User: ${doc.ref.parent.parent!.id}; Subject: ${doc.ref.id}`);

    const serverData = doc.data() as Partial<Omit<Subject, "id">>;
    const subject: Omit<Subject, "id"> = {
        name: serverData.name!,
        cardsCount: 0,
        cardsNextQuiz: {},
        cardsPhase: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
        },
        aggregatedEvents: [],
    };

    const cardsSnap = await doc.ref.collection("cards").get();
    subject.cardsCount = cardsSnap.size;
    for (const doc of cardsSnap.docs) {
        const card = doc.data() as Omit<Card, "id">;
        if (card.phase === 6 || card.nextQuiz === null) {
            continue;
        }

        subject.cardsNextQuiz[card.nextQuiz!] = (subject.cardsNextQuiz[card.nextQuiz!] ?? 0) + 1;
        subject.cardsPhase[card.phase]++;
    }

    doc.ref.update(subject);
}
