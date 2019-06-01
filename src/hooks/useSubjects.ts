import useFirebase from "hooks/useFirebase";
import useUser from "hooks/useUser";
import { useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Subject from "types/Subject";

export default function useSubjects() {
    const firebase = useFirebase();
    const user = useUser();

    const { loading, error, value: snap } = useCollection(firebase.getSubjectsCollection(user));

    let subjects = useMemo<Subject[]>(() => {
        if (snap) {
            return snap.docs.map(doc => ({
                cardsCount: 0,
                cardsNextQuiz: {},
                cardsPhase: {},
                ...(doc.data() as Omit<Subject, "id">),
                id: doc.id
            }));
        } else {
            return [];
        }
    }, [snap]);

    return {
        loading,
        error,
        subjects
    };
}
