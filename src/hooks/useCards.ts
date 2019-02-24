import useFirebase from "hooks/useFirebase";
import useUser from "hooks/useUser";
import { useCollection } from "react-firebase-hooks/firestore";
import { Omit } from "recompose";
import Card from "types/Card";

export default function useCards(
  subjectId: string,
  applyQuery: {
    (q: firebase.firestore.CollectionReference):
      | firebase.firestore.Query
      | firebase.firestore.CollectionReference;
  } = q => q
) {
  const firebase = useFirebase();
  const user = useUser();

  const { loading, error, value: snap } = useCollection(
    applyQuery(firebase.getCardsCollection(user, subjectId))
  );

  let cards: Card[] = [];
  if (snap) {
    cards = snap.docs.map(doc => ({
      ...(doc.data() as Omit<Card, "id">),
      id: doc.id
    }));
  }
  return {
    loading,
    error,
    cards
  };
}
