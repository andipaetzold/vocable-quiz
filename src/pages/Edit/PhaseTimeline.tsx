import Subject from "types/Subject";
import React from "react";
import { Timeline } from "antd";

interface Props {
    subject: Subject;
}

export default function PhaseTimeline({ subject }: Props) {
    return (
        <Timeline style={{ marginBottom: "-50px" }}>
            {[1, 2, 3, 4, 5, 6].map(phase => (
                <Timeline.Item key={phase}>
                    Phase {phase}: {subject.cardsPhase[phase] || 0}
                </Timeline.Item>
            ))}
        </Timeline>
    );
}
