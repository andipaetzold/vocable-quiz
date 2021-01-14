import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import Card from "types/Card";
import Subject from "types/Subject";
import { Omit } from "utility-types";

export const aggregateCards = functions
    .runWith({ memory: "256MB" })
    .firestore.document("users/{userId}/subjects/{subjectId}/cards/{cardId}")
    .onWrite(async ({ before, after }, { params, eventId }) => {
        const subjectRef = firestore()
            .collection("users")
            .doc(params.userId)
            .collection("subjects")
            .doc(params.subjectId);

        await firestore().runTransaction(async transaction => {
            const subjectDoc = await transaction.get(subjectRef);
            const serverData = subjectDoc.data() as Partial<Omit<Subject, "id">>;
            const subject: Omit<Subject, "id"> = {
                name: serverData.name!,
                cardsCount: serverData.cardsCount ?? 0,
                cardsNextQuiz: serverData.cardsNextQuiz ?? {},
                cardsPhase: serverData.cardsPhase ?? {},
                aggregatedEvents: serverData.aggregatedEvents ?? [],
            };

            if (subject.aggregatedEvents.includes(eventId)) {
                return;
            }

            if (before && before.exists) {
                subject.cardsCount = Math.max(0, subject.cardsCount - 1);

                const card = before.data() as Omit<Card, "id">;

                if (card.nextQuiz) {
                    subject.cardsNextQuiz[card.nextQuiz] = (subject.cardsNextQuiz[card.nextQuiz] || 1) - 1;
                }

                if (card.phase) {
                    subject.cardsPhase[card.phase] = (subject.cardsPhase[card.phase] || 1) - 1;
                }
            }

            if (after && after.exists) {
                subject.cardsCount += 1;

                const card = after.data() as Omit<Card, "id">;
                if (card.nextQuiz) {
                    subject.cardsNextQuiz[card.nextQuiz] = (subject.cardsNextQuiz[card.nextQuiz] || 0) + 1;
                }

                if (card.phase) {
                    subject.cardsPhase[card.phase] = (subject.cardsPhase[card.phase] || 0) + 1;
                }
            }

            subject.aggregatedEvents.push(eventId);

            await transaction.update(subjectRef, subject);
        });
    });
