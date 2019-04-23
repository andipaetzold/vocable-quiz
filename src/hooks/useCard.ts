import useFirebase from "hooks/useFirebase";
import useUser from "hooks/useUser";
import { useDocument } from "react-firebase-hooks/firestore";
import { Omit } from "recompose";
import Card from "types/Card";
import { useMemo } from "react";

export default function useCard(subjectId: string, id: string) {
    const firebase = useFirebase();
    const user = useUser();

    const { loading, error, value: snap } = useDocument(firebase.getCardDoc(user, subjectId, id));

    const card = useMemo<Card | undefined>(() => {
        if (snap) {
            return {
                ...(snap.data() as Omit<Card, "id">),
                id: snap.id
            };
        }
    }, [snap]);

    return {
        loading,
        error,
        card
    };
}
