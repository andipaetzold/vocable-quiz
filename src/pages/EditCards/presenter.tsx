import { Breadcrumb, Button, Card } from "antd";
import useFirebase from "hooks/useFirebase";
import useUser from "hooks/useUser";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { Link, RouteComponentProps } from "react-router-dom";
import Subject from "types/Subject";
import { Omit } from "utility-types";
import CardsList from "./CardsList";

export type Props = RouteComponentProps<{ subjectId: string }>;

export default function EditCards({ match, history }: Props) {
  const subjectId = match.params.subjectId;

  const firebase = useFirebase();
  const user = useUser();

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
    <Card
      title={
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/edit">Subjects</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{subject && subject.name}</Breadcrumb.Item>
        </Breadcrumb>
      }
      loading={loading}
    >
      {subject && (
        <>
          <Button
            type="primary"
            style={{ marginBottom: "10px" }}
            onClick={() => history.push(`/edit/${subjectId}/create`)}
          >
            Create Cards
          </Button>
          <CardsList subject={subject} user={user} />
        </>
      )}
    </Card>
  );
}
