import { Breadcrumb, Button, Card as UICard, Col, Form, Icon, Input, Row, Checkbox } from "antd";
import TextArea from "antd/lib/input/TextArea";
import useFirebase from "../../hooks/useFirebase";
import useUser from "../../hooks/useUser";
import i18n from "../../i18n";
import { FormEvent, useRef, useState } from "react";
import { useDocument } from "@lukaselmer/react-firebase-hooks/firestore";
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";
import Card from "../../types/Card";
import Subject from "../../types/Subject";
import { Omit } from "utility-types";

export interface Props {
    subjectId: string;
    card: Pick<Card, "question" | "answer" | "remark">;
    onSubmit: (card: Pick<Card, "question" | "answer" | "remark">) => Promise<void>;

    reverse: boolean;
    onReverseChange?: (checked: boolean) => void;
}

export default function Presenter({ onSubmit, subjectId, card, reverse, onReverseChange }: Props) {
    const firebase = useFirebase();
    const user = useUser();

    const questionRef = useRef<TextArea>(null);
    const [question, setQuestion] = useState(card.question);
    const [answer, setAnswer] = useState(card.answer);
    const [remark, setRemark] = useState(card.remark);

    const [snap, loading] = useDocument(firebase.getSubjectDoc(user, subjectId));

    let subject: Subject | undefined = undefined;
    if (snap) {
        subject = {
            ...(snap.data() as Omit<Subject, "id">),
            id: snap.id
        };
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        onSubmit({ question, answer, remark });

        if (questionRef.current) {
            questionRef.current.focus();
        }
    };

    return (
        <UICard
            title={
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/edit">
                            <Trans i18nKey="subject.plural.big" />
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{subject && <Link to={`/edit/${subject.id}`}>{subject.name}</Link>}</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Trans i18nKey="pages.editcard.title" />
                    </Breadcrumb.Item>
                </Breadcrumb>
            }
            loading={loading}
        >
            <Form onSubmit={handleSubmit}>
                <Row gutter={10}>
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
                {onReverseChange && (
                    <Row>
                        <Col span={24}>
                            <Form.Item>
                                <Checkbox checked={reverse} onChange={e => onReverseChange(e.target.checked)}>
                                    <Trans i18nKey="pages.editcard.reverse" />
                                </Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                )}
                <Row>
                    <Col span={24}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                <Icon type="plus" />
                                <Trans i18nKey="pages.editcard.title" />
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </UICard>
    );
}
