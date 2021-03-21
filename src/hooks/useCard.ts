import useFirebase from "./useFirebase";
import useUser from "./useUser";
import { useDocument } from "@lukaselmer/react-firebase-hooks/firestore";
import Card from "../types/Card";
import { useMemo } from "react";

export default function useCard(subjectId: string, id: string) {
    const firebase = useFirebase();
    const user = useUser();

    const [snap, loading, error] = useDocument(firebase.getCardDoc(user, subjectId, id));

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
