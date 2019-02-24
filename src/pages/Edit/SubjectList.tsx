import { Button, Card, Icon, Table } from "antd";
import AuthUserContext from "hoc/withAuthUser/context";
import useFirebase from "hooks/useFirebase";
import React, { useContext } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Subject from "types/Subject";
import { Omit } from "utility-types";
import { Link, withRouter } from "react-router-dom";
import { RouterProps } from "react-router";

function SubjectList({ history }: RouterProps) {
  const firebase = useFirebase();
  const user = useContext(AuthUserContext);

  if (!user) {
    throw new Error("User is undefined");
  }

  const { loading, error, value: subjectsSnap } = useCollection(
    firebase.getSubjectsCollection(user)
  );

  let subjects: Subject[] = [];
  if (subjectsSnap) {
    subjects = subjectsSnap.docs.map(doc => ({
      ...(doc.data() as Omit<Subject, "id">),
      id: doc.id
    }));
  }

  return (
    <Card title="Edit Subject">
      <Table
        loading={loading}
        dataSource={subjects}
        rowKey={({ id }) => id}
        bordered
        columns={[
          {
            title: "Name",
            dataIndex: "name",
            key: "name"
          },
          {
            title: "Today's cards",
            dataIndex: "today",
            key: "today"
          },
          {
            title: "Cards",
            dataIndex: "cards",
            key: "cards"
          },
          {
            title: "Action",
            key: "action",
            render: ({ id }) => (
              <Button.Group size="small">
                <Button
                  type="primary"
                  size="small"
                  onClick={() => history.push(`/edit/${id}/create`)}
                >
                  <Icon type="plus" /> Create
                </Button>
                <Button
                  size="small"
                  onClick={() => history.push(`/edit/${id}`)}
                >
                  <Icon type="edit" />
                  Edit
                </Button>
              </Button.Group>
            )
          }
        ]}
      />
    </Card>
  );
}

export default withRouter(SubjectList);
