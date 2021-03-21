import useFirebase from "./useFirebase";
import useUser from "./useUser";
import { useMemo } from "react";
import { useCollection } from "@lukaselmer/react-firebase-hooks/firestore";
import Card from "../types/Card";
import firebase from 'firebase/app';

export default function useCards(
    subjectId: string,
    applyQuery: {
        (q: firebase.firestore.CollectionReference): firebase.firestore.Query | firebase.firestore.CollectionReference;
    } = q => q
) {
    const firebase = useFirebase();
    const user = useUser();

    const [snap, loading, error] = useCollection(applyQuery(firebase.getCardsCollection(user, subjectId)));

    const cards = useMemo<Card[]>(() => {
        if (snap) {
            return snap.docs.map(doc => ({
                ...(doc.data() as Omit<Card, "id">),
                id: doc.id
            }));
        } else {
            return [];
        }
    }, [snap]);

    return {
        loading,
        error,
        cards
    };
}
