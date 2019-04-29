import { Breadcrumb, Button, Card, Form, Icon, Input, message, Row, Col } from "antd";
import useFirebase from "hooks/useFirebase";
import useUser from "hooks/useUser";
import i18n from "i18n";
import React, { FormEvent, useRef, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { Trans } from "react-i18next";
import { Link, RouteComponentProps } from "react-router-dom";
import Subject from "types/Subject";
import { Omit } from "utility-types";

export type Props = RouteComponentProps<{ subjectId: string }>;

export default function CreateCard(props: Props) {
    const subjectId = props.match.params.subjectId;

    const firebase = useFirebase();
    const user = useUser();

    const questionRef = useRef<any>(null); // TODO: Find correct type for Input.TextArea
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [remark, setRemark] = useState("");

    const { loading, value: snap } = useDocument(firebase.getSubjectDoc(user, subjectId));

    let subject: Subject | undefined = undefined;
    if (snap) {
        subject = {
            ...(snap.data() as Omit<Subject, "id">),
            id: snap.id
        };
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        (async () => {
            await firebase.createCard(user, subjectId, { question, answer, remark });
            message.success("Card was created");
        })();

        setQuestion("");
        setAnswer("");

        if (questionRef.current) {
            questionRef.current.focus();
        }
    };

    return (
        <Card
            title={
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/edit">
                            <Trans i18nKey="subject.plural.big" />
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{subject && <Link to={`/edit/${subject.id}`}>{subject.name}</Link>}</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Trans i18nKey="pages.createcard.title" />
                    </Breadcrumb.Item>
                </Breadcrumb>
            }
            loading={loading}
        >
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col sm={24} md={8}>
                        <Form.Item>
                            <Input.TextArea
                                style={{ resize: "none" }}
                                rows={5}
                                cols={30}
                                ref={questionRef}
                                placeholder={i18n.t("question")}
                                value={question}
                                onChange={e => setQuestion(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col sm={24} md={8}>
                        <Form.Item>
                            <Input.TextArea
                                style={{ resize: "none" }}
                                rows={5}
                                cols={30}
                                placeholder={i18n.t("answer")}
                                value={answer}
                                onChange={e => setAnswer(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col sm={24} md={8}>
                        <Form.Item>
                            <Input.TextArea
                                style={{ resize: "none" }}
                                rows={5}
                                cols={30}
                                placeholder={i18n.t("remark")}
                                value={remark}
                                onChange={e => setRemark(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                <Icon type="plus" />
                                <Trans i18nKey="pages.createcard.title" />
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
}
