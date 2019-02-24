import { Button, Card, Icon, Table } from "antd";
import useSubjects from "hooks/useSubjects";
import React from "react";
import { RouteComponentProps } from "react-router";
import { getTodayCardCount } from "util/subject";

type Props = {} & RouteComponentProps;

export default function Quiz({ history }: Props) {
  const { loading, subjects } = useSubjects();

  return (
    <Card title="Quiz" loading={loading}>
      <Table
        bordered
        rowKey={({ id }) => id}
        dataSource={subjects}
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
            title: "Action",
            key: "action",
            render: ({ id }) => (
              <Button
                type="primary"
                size="small"
                onClick={() => history.push(`/quiz/${id}`)}
              >
                <Icon type="play-circle" /> Go
              </Button>
            )
          }
        ]}
      />
    </Card>
  );
}
