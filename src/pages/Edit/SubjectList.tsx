import {
  Button,
  Card,
  Icon,
  Table,
  Popconfirm,
  message,
  Breadcrumb
} from "antd";
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

  const handleDelete = async (id: string) => {
    const hide = message.loading("Deleting subject...");
    await firebase.deleteSubject(user, id);
    hide();
    message.success("Subject deleted");
  };

  return (
    <Card
      title={
        <Breadcrumb>
          <Breadcrumb.Item>Subjects</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
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
                <Popconfirm
                  title={
                    <>
                      Are you sure delete this subject?
                      <br />
                      This will also delete its cards!
                    </>
                  }
                  onConfirm={() => handleDelete(id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="danger" size="small">
                    <Icon type="delete" />
                    Delete
                  </Button>
                </Popconfirm>
              </Button.Group>
            )
          }
        ]}
      />
    </Card>
  );
}

export default withRouter(SubjectList);
