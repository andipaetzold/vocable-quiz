import { Button, Card, Form, Icon, Input, message } from "antd";
import AuthUserContext from "hoc/withAuthUser/context";
import useFirebase from "hooks/useFirebase";
import React, { FormEvent, useContext, useRef, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { RouteComponentProps } from "react-router-dom";
import Subject from "types/Subject";
import { Omit } from "utility-types";

export type Props = RouteComponentProps<{ subjectId: string }>;

export default function CreateCard(props: Props) {
  const subjectId = props.match.params.subjectId;

  const firebase = useFirebase();
  const user = useContext(AuthUserContext);

  const questionRef = useRef<any>(null); // TODO: Find correct type for Input.TextArea
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  if (!user) {
    throw new Error();
  }

  const { loading, error, value: snap } = useDocument(
    firebase.getSubjectDoc(user, subjectId)
  );

  let subject: Subject | undefined = undefined;
  if (snap) {
    subject = {
      ...(snap.data() as Omit<Subject, "id">),
      id: snap.id
    };
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const hide = message.loading("Creating card");
    await firebase.createCard(user, subjectId, { question, answer });

    setQuestion("");
    setAnswer("");

    if (questionRef.current) {
      questionRef.current.focus();
    }

    hide();
    message.success("Card was created");
  };

  return (
    <Card title={subject ? subject.name : ""} loading={loading}>
      <Form layout="inline" onSubmit={handleSubmit}>
        <Form.Item>
          <Input.TextArea
            style={{ resize: "none" }}
            rows={5}
            cols={30}
            ref={questionRef}
            placeholder="Question"
            value={question}
            onChange={e => setQuestion(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input.TextArea
            style={{ resize: "none" }}
            rows={5}
            cols={30}
            placeholder="Answer"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            <Icon type="plus" />
            Create Card
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
