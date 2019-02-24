import { firestore } from "firebase-admin";
import * as functions from "firebase-functions";
import Card from "types/Card";
import Subject from "types/Subject";
import { Omit } from "utility-types";

export const aggregateCards = functions.firestore
  .document("users/{userId}/subjects/{subjectId}/cards/{cardId}")
  .onWrite(async ({ before, after }, { params }) => {
    const subjectRef = firestore()
      .collection("users")
      .doc(params.userId)
      .collection("subjects")
      .doc(params.subjectId);

    await firestore().runTransaction(async transaction => {
      const subjectDoc = await transaction.get(subjectRef);
      const subject: Omit<Subject, "id"> = {
        cards: 0,
        nextQuiz: {},
        ...(subjectDoc.data() as Omit<Subject, "id">)
      };

      if (before && before.exists) {
        subject.cards = Math.max(0, subject.cards - 1);

        const card = before.data() as Omit<Card, "id">;
        if (card.nextQuiz) {
          subject.nextQuiz[card.nextQuiz] =
            (subject.nextQuiz[card.nextQuiz] || 1) - 1;
        }
      }

      if (after && after.exists) {
        subject.cards += 1;

        const card = after.data() as Omit<Card, "id">;
        if (card.nextQuiz) {
          subject.nextQuiz[card.nextQuiz] =
            (subject.nextQuiz[card.nextQuiz] || 0) + 1;
        }
      }

      await transaction.update(subjectRef, subject);
    });
  });
