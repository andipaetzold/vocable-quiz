import { Card } from "antd";
import AuthUserContext from "hoc/withAuthUser/context";
import useFirebase from "hooks/useFirebase";
import React, { useContext } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { RouteComponentProps } from "react-router-dom";
import Subject from "types/Subject";
import { Omit } from "utility-types";
import CardsList from "./CardsList";

export type Props = RouteComponentProps<{ subjectId: string }>;

export default function EditCards({ match }: Props) {
  const subjectId = match.params.subjectId;

  const firebase = useFirebase();
  const user = useContext(AuthUserContext);

  if (!user) {
    throw new Error();
  }

  const { loading, error, value: snap } = useDocument(
    firebase.getSubjectDoc(user, subjectId)
  );

  let subject: Subject | undefined = undefined;
  if (snap) {
    subject = {
      ...(snap.data() as Omit<Subject, "id">),
      id: snap.id
    };
  }

  return (
    <Card title={subject ? subject.name : ""} loading={loading}>
      {subject && <CardsList subject={subject} user={user} />}
    </Card>
  );
}
