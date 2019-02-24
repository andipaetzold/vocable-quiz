import { Table, Button, Icon, Popconfirm, message } from "antd";
import React from "react";
import Subject from "types/Subject";
import { useCollection } from "react-firebase-hooks/firestore";
import { User } from "firebase";
import useFirebase from "hooks/useFirebase";
import Card from "types/Card";
import { Omit } from "utility-types";

interface Props {
  user: User;
  subject: Subject;
}

export default function CardsList({ user, subject }: Props) {
  const firebase = useFirebase();

  const { loading, error, value: cardsSnap } = useCollection(
    firebase.getCardsCollection(user, subject.id)
  );

  let cards: Card[] = [];
  if (cardsSnap) {
    cards = cardsSnap.docs.map(doc => ({
      ...(doc.data() as Omit<Card, "id">),
      id: doc.id
    }));
  }

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
      columns={[
        {
          title: "Question",
          dataIndex: "question",
          key: "question"
        },
        {
          title: "Answer",
          dataIndex: "answer",
          key: "answer"
        },
        {
          title: "Created",
          dataIndex: "createdAt",
          key: "cretedAt"
        },
        {
          title: "Next Quiz",
          dataIndex: "nextQuiz",
          key: "nextQuiz"
        },
        {
          title: "Phase",
          dataIndex: "phase",
          key: "phase"
        },
        {
          title: "Action",
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
                  <Icon type="delete" /> Delete
                </Button>
              </Popconfirm>
            </Button.Group>
          )
        }
      ]}
    />
  );
}
