import useFirebase from "../hooks/useFirebase";
import useUser from "../hooks/useUser";
import { useMemo } from "react";
import { useDocument } from "@lukaselmer/react-firebase-hooks/firestore";
import Subject from "../types/Subject";

export default function useSubject(id: string) {
    const firebase = useFirebase();
    const user = useUser();

    const [snap, loading, error] = useDocument(firebase.getSubjectDoc(user, id));

    let subject = useMemo<Subject | undefined>(() => {
        if (snap) {
            const serverData = snap.data() as Partial<Omit<Subject, "id">>;
            return {
                id: snap.id,
                name: serverData.name!,
                cardsCount: serverData.cardsCount ?? 0,
                cardsNextQuiz: serverData.cardsNextQuiz ?? {},
                cardsPhase: serverData.cardsPhase ?? {},
                aggregatedEvents: serverData.aggregatedEvents ?? [],
            };
        }
    }, [snap]);

    return {
        loading,
        error,
        subject,
    };
}
