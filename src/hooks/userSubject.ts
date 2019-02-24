import { useDocument } from "react-firebase-hooks/firestore";
import { Omit } from "recompose";
import Subject from "types/Subject";
import useFirebase from "hooks/useFirebase";
import useUser from "hooks/useUser";

export default function useSubject(id: string) {
  const firebase = useFirebase();
  const user = useUser();

  const { loading, error, value: snap } = useDocument(
    firebase.getSubjectDoc(user, id)
  );

  let subject: Subject | undefined = undefined;
  if (snap) {
    subject = {
      ...(snap.data() as Omit<Subject, "id">),
      id: snap.id
    };
  }
  return {
    loading,
    error,
    subject
  };
}
