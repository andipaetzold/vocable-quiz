import {
  Breadcrumb,
  Button,
  Card,
  Icon,
  message,
  Popconfirm,
  Popover,
  Table,
  Timeline
} from "antd";
import useFirebase from "hooks/useFirebase";
import useSubjects from "hooks/useSubjects";
import useUser from "hooks/useUser";
import React from "react";
import { RouterProps } from "react-router";
import { withRouter } from "react-router-dom";
import Subject from "types/Subject";
import { getTodayCardCount } from "util/subject";
import PhaseTimeline from "./PhaseTimeline";

function SubjectList({ history }: RouterProps) {
  const firebase = useFirebase();
  const user = useUser();

  const { loading, subjects } = useSubjects();

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
        style={{ overflowX: "auto" }}
        columns={[
          {
            title: "Name",
            dataIndex: "name",
            key: "name"
          },
          {
            title: "Today's cards",
            key: "today",
            render: getTodayCardCount
          },
          {
            title: "Cards",
            key: "cardsCount",
            render: (subject: Subject) => {
              const { cardsCount } = subject;
              return (
                <>
                  {cardsCount}{" "}
                  <Popover
                    title="Phases"
                    content={<PhaseTimeline subject={subject} />}
                  >
                    <Icon type="info-circle" />
                  </Popover>
                </>
              );
            }
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
