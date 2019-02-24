import { Button, Card, Icon, Table } from "antd";
import useSubjects from "hooks/useSubjects";
import React from "react";
import { RouteComponentProps } from "react-router";
import { getTodayCardCount } from "util/subject";
import Subject from "types/Subject";
import { Trans } from "react-i18next";

type Props = {} & RouteComponentProps;

export default function QuizList({ history }: Props) {
  const { loading, subjects } = useSubjects();

  return (
    <Card title={<Trans i18nKey="pages.quizlist.title" />} loading={loading}>
      <Table
        bordered
        rowKey={({ id }) => id}
        dataSource={subjects}
        columns={[
          {
            title: <Trans i18nKey="subject.singular.big" />,
            dataIndex: "name",
            key: "name"
          },
          {
            title: <Trans i18nKey="pages.quizlist.today" />,
            key: "today",
            render: getTodayCardCount
          },
          {
            title: <Trans i18nKey="actions" />,
            key: "actions",
            render: (subject: Subject) => {
              const { id } = subject;
              return (
                <Button
                  type="primary"
                  size="small"
                  onClick={() => history.push(`/quiz/${id}`)}
                  disabled={getTodayCardCount(subject) === 0}
                >
                  <Icon type="play-circle" />{" "}
                  <Trans i18nKey="pages.quizlist.go" />
                </Button>
              );
            }
          }
        ]}
      />
    </Card>
  );
}
