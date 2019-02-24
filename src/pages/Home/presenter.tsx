import AuthUserContext from "hoc/withAuthUser/context";
import { useContext } from "react";
import React from "react";
import { Card, Statistic, Col, Row } from "antd";
import useUser from "hooks/useUser";
import useSubjects from "hooks/useSubjects";

export default function Home() {
  const user = useUser();

  const { loading, subjects } = useSubjects();

  return (
    <Card title={`Hello ${user.displayName}`} loading={loading}>
      <Row>
        <Col span={6}>
          {subjects && <Statistic title="Subjects" value={subjects.length} />}
        </Col>
        <Col span={6}>
          {subjects && (
            <Statistic
              title="Cards to Learn"
              value={subjects
                .map(s => s.cardsCount - (s.cardsPhase[6] || 0))
                .reduce((prev, cur) => prev + cur, 0)}
            />
          )}
        </Col>
        <Col span={6}>
          {subjects && (
            <Statistic
              title="Cards in Phase 6"
              value={subjects
                .map(s => s.cardsPhase[6] || 0)
                .reduce((prev, cur) => prev + cur, 0)}
            />
          )}
        </Col>
        <Col span={6}>
          {subjects && (
            <Statistic
              title="Number of Cards"
              value={subjects
                .map(s => s.cardsCount)
                .reduce((prev, cur) => prev + cur, 0)}
            />
          )}
        </Col>
      </Row>
    </Card>
  );
}
