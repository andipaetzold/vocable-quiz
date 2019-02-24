import { Icon, Steps } from "antd";
import React from "react";
import Card from "types/Card";
import { Trans } from "react-i18next";

interface Props {
  card: Card;
}

export default function PhaseTimeline({ card }: Props) {
  const getStatus = (phase: number) =>
    card.phase === phase ? "process" : card.phase > phase ? "finish" : "wait";

  const getIcon = (phase: number) =>
    card.phase === phase ? <Icon type="loading" /> : undefined;

  return (
    <Steps size="small">
      <Steps.Step
        title={
          <>
            <Trans i18nKey="phase" /> 1
          </>
        }
        description={<Trans i18nKey="day" count={0} values={{ count: 0 }} />}
        status={getStatus(1)}
        icon={getIcon(1)}
      />
      <Steps.Step
        title={
          <>
            <Trans i18nKey="phase" /> 2
          </>
        }
        description={<Trans i18nKey="day" count={3} values={{ count: 3 }} />}
        status={getStatus(2)}
        icon={getIcon(2)}
      />
      <Steps.Step
        title={
          <>
            <Trans i18nKey="phase" /> 3
          </>
        }
        description={<Trans i18nKey="day" count={10} values={{ count: 10 }} />}
        status={getStatus(3)}
        icon={getIcon(3)}
      />
      <Steps.Step
        title={
          <>
            <Trans i18nKey="phase" /> 4
          </>
        }
        description={<Trans i18nKey="day" count={30} values={{ count: 30 }} />}
        status={getStatus(4)}
        icon={getIcon(4)}
      />
      <Steps.Step
        title={
          <>
            <Trans i18nKey="phase" /> 5
          </>
        }
        description={<Trans i18nKey="day" count={90} values={{ count: 90 }} />}
        status={getStatus(5)}
        icon={getIcon(5)}
      />
      <Steps.Step
        title={
          <>
            <Trans i18nKey="phase" /> 6
          </>
        }
        description={<Trans i18nKey="pages.quiz.longterm" />}
        status={getStatus(6)}
        icon={getIcon(6)}
      />
    </Steps>
  );
}
