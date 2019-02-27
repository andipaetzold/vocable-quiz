import { Button, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Trans } from "react-i18next";
import Card from "types/Card";
import PhaseTimeline from "./PhaseTimeline";

const colConfig = {
  xs: { span: 24 },
  sm: { span: 24 },
  md: { span: 8 },
  lg: { span: 8 },
  xl: { span: 8 }
};

interface Props {
  card: Card;

  correct(): void;
  wrong(): void;
}

export default function QuizCard({ card, correct, wrong }: Props) {
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
              <Trans i18nKey="pages.quiz.reveal" />
            </Button>
          )}
        </Col>
      </Row>

      <Row>
        {isRevealed && (
          <>
            <Col span={12}>
              <Button block={true} type="primary" onClick={correct}>
                <Trans i18nKey="pages.quiz.correct" />
              </Button>
            </Col>
            <Col span={12}>
              <Button block={true} type="danger" onClick={wrong}>
                <Trans i18nKey="pages.quiz.wrong" />
              </Button>
            </Col>
          </>
        )}
      </Row>
    </>
  );
}
