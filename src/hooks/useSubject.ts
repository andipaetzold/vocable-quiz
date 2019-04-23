import useFirebase from "hooks/useFirebase";
import useUser from "hooks/useUser";
import { useMemo } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { Omit } from "recompose";
import Subject from "types/Subject";

export default function useSubject(id: string) {
    const firebase = useFirebase();
    const user = useUser();

    const { loading, error, value: snap } = useDocument(firebase.getSubjectDoc(user, id));

    let subject = useMemo<Subject | undefined>(() => {
        if (snap) {
            return {
                cardsCount: 0,
                cardsNextQuiz: {},
                cardsPhase: {},
                ...(snap.data() as Omit<Subject, "id">),
                id: snap.id
            };
        }
    }, [snap]);

    return {
        loading,
        error,
        subject
    };
}
