import { message } from "antd";
import useCard from "hooks/useCard";
import useFirebase from "hooks/useFirebase";
import useUser from "hooks/useUser";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import Card from "types/Card";
import Presenter from "./presenter";

export type Props = RouteComponentProps<{ subjectId: string; cardId: string }>;

export default function EditCard({
    match: {
        params: { subjectId, cardId }
    }
}: Props) {
    const firebase = useFirebase();
    const user = useUser();

    const { card, loading: cardLoading } = useCard(subjectId, cardId);
    const [fixedCard, setFixedCard] = useState<Card | undefined>(undefined);

    useEffect(() => {
        if (cardLoading || !!fixedCard || !card) {
            return;
        }

        setFixedCard(card);
    }, [card, fixedCard, cardLoading]);

    const handleSubmit = async (card: Pick<Card, "question" | "answer" | "remark">) => {
        await firebase.updateCard(user, subjectId, { id: cardId, ...card });
        message.success("Card was updated");
    };

    if (!fixedCard) {
        return null;
    }

    return <Presenter subjectId={subjectId} card={fixedCard} onSubmit={handleSubmit} />;
}
