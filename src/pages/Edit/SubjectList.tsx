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
import { Trans } from "react-i18next";

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
          <Breadcrumb.Item>
            <Trans i18nKey="subject.plural.big" />
          </Breadcrumb.Item>
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
            title: <Trans i18nKey="subject.singular.big" />,
            dataIndex: "name",
            key: "name"
          },
          {
            title: <Trans i18nKey="today" />,
            key: "today",
            render: getTodayCardCount
          },
          {
            title: <Trans i18nKey="card.plural.big" />,
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
            title: <Trans i18nKey="actions" />,
            key: "action",
            render: ({ id }) => (
              <Button.Group size="small">
                <Button
                  type="primary"
                  size="small"
                  onClick={() => history.push(`/edit/${id}/create`)}
                >
                  <Icon type="plus" /> <Trans i18nKey="create" />
                </Button>
                <Button
                  size="small"
                  onClick={() => history.push(`/edit/${id}`)}
                >
                  <Icon type="edit" />
                  <Trans i18nKey="edit" />
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
                    <Trans i18nKey="delete" />
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
