import { Button, Icon, message, Popconfirm, Progress, Table, Form, Input } from "antd";
import firebase from "firebase/app";
import useCards from "../../hooks/useCards";
import useFirebase from "../../hooks/useFirebase";
import React, { useState, useCallback, useMemo } from "react";
import { Trans } from "react-i18next";
import { RouteComponentProps, withRouter } from "react-router";
import Subject from "../../types/Subject";
import FormItem from "antd/lib/form/FormItem";
import Card from "../../types/Card";

interface Props extends RouteComponentProps {
    user: firebase.User;
    subject: Subject;
}

function CardsList({ user, subject, history }: Props) {
    const firebase = useFirebase();

    const [filter, setFilter] = useState("");
    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value), [setFilter]);

    const { loading, cards } = useCards(subject.id);

    const handleDelete = useCallback(
        (id: string) => {
            (async () => {
                const hide = message.loading("Deleting card");

                await firebase.deleteCard(user, subject.id, id);

                hide();
                message.success("Card deleted", 2);
            })();
        },
        [firebase, subject.id, user]
    );

    const filteredCards = useMemo<Card[]>(() => {
        if (loading) {
            return [];
        }

        if (filter === "") {
            return cards;
        }

        return cards.filter((card) => card.question.includes(filter) || card.answer.includes(filter) || card.remark.includes(filter));
    }, [filter, cards, loading]);

    return (
        <>
            <Form layout="inline">
                <FormItem label="Filter">
                    <Input value={filter} onChange={handleFilterChange} />
                </FormItem>
            </Form>
            <Table
                loading={loading}
                dataSource={filteredCards}
                rowKey={({ id }) => id}
                bordered
                style={{ overflowX: "auto" }}
                columns={[
                    {
                        title: <Trans i18nKey="question" />,
                        dataIndex: "question",
                        key: "question",
                    },
                    {
                        title: <Trans i18nKey="answer" />,
                        dataIndex: "answer",
                        key: "answer",
                    },
                    {
                        title: <Trans i18nKey="nextquiz" />,
                        dataIndex: "nextQuiz",
                        key: "nextQuiz",
                    },
                    {
                        title: <Trans i18nKey="phase" />,
                        key: "phase",
                        render: ({ phase = 1 }) => (
                            <Progress
                                size="small"
                                type="line"
                                percent={((phase - 1) / 5) * 100}
                                format={() => `${phase} / 6`}
                                status={phase === 0 ? "normal" : phase === 6 ? "success" : "active"}
                            />
                        ),
                    },
                    {
                        title: <Trans i18nKey="actions" />,
                        key: "action",
                        render: ({ id }) => (
                            <Button.Group>
                                <Popconfirm
                                    title="Are you sure delete this card?"
                                    onConfirm={() => handleDelete(id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button.Group size="small">
                                        <Button size="small" onClick={() => history.push(`/edit/${subject.id}/${id}`)}>
                                            <Icon type="edit" /> <Trans i18nKey="edit" />
                                        </Button>
                                        <Button type="danger" size="small">
                                            <Icon type="delete" /> <Trans i18nKey="delete" />
                                        </Button>
                                    </Button.Group>
                                </Popconfirm>
                            </Button.Group>
                        ),
                    },
                ]}
            />
        </>
    );
}

export default withRouter(CardsList);
