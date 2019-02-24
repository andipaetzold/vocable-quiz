import PhaseTimeline from "./PhaseTimeline";
import React, { useState, useEffect } from "react";
import Card from "types/Card";
import { Input, Col, Row, Button } from "antd";
import Subject from "types/Subject";
import useFirebase from "hooks/useFirebase";
import useUser from "hooks/useUser";

const colConfig = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 8 },
  lg: { span: 8 },
  xl: { span: 8 }
};

interface Props {
  subject: Subject;
  card: Card;
}

export default function QuizCard({ subject, card }: Props) {
  const firebase = useFirebase();
  const user = useUser();
  const [answer, setAnswer] = useState("");
  const [isRevealed, setRevealed] = useState(false);

  useEffect(() => {
    setAnswer("");
    setRevealed(false);
  }, [card.id, card.updatedTimestamp]);
  return (
    <>
      <Row style={{ marginBottom: "30px" }}>
        <Col>
          <PhaseTimeline card={card} />
        </Col>
      </Row>

      <Row style={{ marginBottom: "20px" }}>
        <Col {...colConfig}>
          <Input.TextArea
            value={card.question}
            readOnly
            style={{ resize: "none" }}
            rows={5}
          />
        </Col>
        <Col {...colConfig}>
          <Input.TextArea
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            style={{ resize: "none" }}
            rows={5}
            disabled={isRevealed}
          />
        </Col>
        <Col {...colConfig}>
          {isRevealed ? (
            <Input.TextArea
              value={card.answer}
              readOnly
              style={{ resize: "none" }}
              rows={5}
            />
          ) : (
            <Button
              block={true}
              type="dashed"
              onClick={() => setRevealed(true)}
              style={{ height: "115px" }}
            >
              Reveal Answer
            </Button>
          )}
        </Col>
      </Row>

      <Row>
        {isRevealed && (
          <>
            <Col span={12}>
              <Button
                block={true}
                type="primary"
                onClick={() =>
                  firebase.updatePhase(
                    user,
                    subject.id,
                    card.id,
                    card.phase + 1
                  )
                }
              >
                Correct
              </Button>
            </Col>
            <Col span={12}>
              <Button
                block={true}
                type="danger"
                onClick={() =>
                  firebase.updatePhase(user, subject.id, card.id, 1)
                }
              >
                Wrong
              </Button>
            </Col>
          </>
        )}
      </Row>
    </>
  );
}
