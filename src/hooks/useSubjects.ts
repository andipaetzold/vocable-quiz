import useFirebase from "hooks/useFirebase";
import useUser from "hooks/useUser";
import { useCollection } from "react-firebase-hooks/firestore";
import { Omit } from "recompose";
import Subject from "types/Subject";

export default function useSubjects() {
  const firebase = useFirebase();
  const user = useUser();

  const { loading, error, value: snap } = useCollection(
    firebase.getSubjectsCollection(user)
  );

  let subjects: Subject[] = [];
  if (snap) {
    subjects = snap.docs.map(doc => ({
      ...(doc.data() as Omit<Subject, "id">),
      id: doc.id
    }));
  }
  return {
    loading,
    error,
    subjects
  };
}
