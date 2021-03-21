import useFirebase from "../hooks/useFirebase";
import useUser from "../hooks/useUser";
import { useMemo } from "react";
import { useCollection } from "@lukaselmer/react-firebase-hooks/firestore";
import Subject from "../types/Subject";

export default function useSubjects() {
    const firebase = useFirebase();
    const user = useUser();

    const [snap, loading, error] = useCollection(firebase.getSubjectsCollection(user));

    let subjects = useMemo<Subject[]>(() => {
        if (snap) {
            return snap.docs.map((doc) => {
                const serverData = doc.data() as Partial<Omit<Subject, "id">>;
                return {
                    id: doc.id,
                    name: serverData.name!,
                    cardsCount: serverData.cardsCount ?? 0,
                    cardsNextQuiz: serverData.cardsNextQuiz ?? {},
                    cardsPhase: serverData.cardsPhase ?? {},
                    aggregatedEvents: serverData.aggregatedEvents ?? [],
                };
            });
        } else {
            return [];
        }
    }, [snap]);

    return {
        loading,
        error,
        subjects,
    };
}
