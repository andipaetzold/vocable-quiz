import AuthUserContext from "hoc/withAuthUser/context";
import { useContext } from "react";
import React from "react";
import { Card, Statistic, Col, Row } from "antd";
import useUser from "hooks/useUser";
import useSubjects from "hooks/useSubjects";
import i18n from "i18n";

export default function Home() {
  const user = useUser();

  const { loading, subjects } = useSubjects();

  return (
    <Card
      title={i18n.t("pages.home.title", {
        name: user.displayName
      })}
      loading={loading}
    >
      <Row>
        <Col span={6}>
          {subjects && (
            <Statistic
              title={i18n.t("subject.plural.big")}
              value={subjects.length}
            />
          )}
        </Col>
        <Col span={6}>
          {subjects && (
            <Statistic
              title={i18n.t("pages.home.tolearn")}
              value={subjects
                .map(s => s.cardsCount - (s.cardsPhase[6] || 0))
                .reduce((prev, cur) => prev + cur, 0)}
            />
          )}
        </Col>
        <Col span={6}>
          {subjects && (
            <Statistic
              title={i18n.t("pages.home.inphase6")}
              value={subjects
                .map(s => s.cardsPhase[6] || 0)
                .reduce((prev, cur) => prev + cur, 0)}
            />
          )}
        </Col>
        <Col span={6}>
          {subjects && (
            <Statistic
              title={i18n.t("pages.home.cardcount")}
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
