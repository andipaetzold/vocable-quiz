import { Button, Icon, message, Popconfirm, Progress, Table } from "antd";
import { User } from "firebase";
import useCards from "hooks/useCards";
import useFirebase from "hooks/useFirebase";
import React from "react";
import { Trans } from "react-i18next";
import Subject from "types/Subject";

interface Props {
    user: User;
    subject: Subject;
}

export default function CardsList({ user, subject }: Props) {
    const firebase = useFirebase();

    const { loading, cards } = useCards(subject.id);

    const handleDelete = async (id: string) => {
        const hide = message.loading("Deleting card");

        await firebase.deleteCard(user, subject.id, id);

        hide();
        message.success("Card deleted", 2);
    };

    return (
        <Table
            loading={loading}
            dataSource={cards}
            rowKey={({ id }) => id}
            bordered
            style={{ overflowX: "auto" }}
            columns={[
                {
                    title: <Trans i18nKey="question" />,
                    dataIndex: "question",
                    key: "question"
                },
                {
                    title: <Trans i18nKey="answer" />,
                    dataIndex: "answer",
                    key: "answer"
                },
                {
                    title: <Trans i18nKey="nextquiz" />,
                    dataIndex: "nextQuiz",
                    key: "nextQuiz"
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
                    )
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
                                <Button type="danger" size="small">
                                    <Icon type="delete" /> <Trans i18nKey="delete" />
                                </Button>
                            </Popconfirm>
                        </Button.Group>
                    )
                }
            ]}
        />
    );
}
