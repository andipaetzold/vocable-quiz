import { Icon, Steps } from "antd";
import React from "react";
import Card from "types/Card";

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
        title="Phase 1"
        description="0 days"
        status={getStatus(1)}
        icon={getIcon(1)}
      />
      <Steps.Step
        title="Phase 2"
        description="3 days"
        status={getStatus(2)}
        icon={getIcon(2)}
      />
      <Steps.Step
        title="Phase 3"
        description="10 days"
        status={getStatus(3)}
        icon={getIcon(3)}
      />
      <Steps.Step
        title="Phase 4"
        description="30 days"
        status={getStatus(4)}
        icon={getIcon(4)}
      />
      <Steps.Step
        title="Phase 5"
        description="90 days"
        status={getStatus(5)}
        icon={getIcon(5)}
      />
      <Steps.Step
        title="Phase 6"
        description="Long-Term Memory"
        status={getStatus(6)}
        icon={getIcon(6)}
      />
    </Steps>
  );
}
