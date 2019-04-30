import { message } from "antd";
import useFirebase from "hooks/useFirebase";
import useUser from "hooks/useUser";
import Presenter from "pages/EditCard/presenter";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import Card from "types/Card";

export type Props = RouteComponentProps<{ subjectId: string }>;

export default function CreateCard({
    match: {
        params: { subjectId }
    }
}: Props) {
    const firebase = useFirebase();
    const user = useUser();
    const [key, setKey] = useState(0);

    const handleSubmit = async (card: Pick<Card, "question" | "answer" | "remark">) => {
        (async () => {
            await firebase.createCard(user, subjectId, card);
            message.success("Card was created");
        })();

        setKey(k => k + 1);
    };

    return <Presenter key={key} subjectId={subjectId} card={{ question: "", answer: "", remark: "" }} onSubmit={handleSubmit} />;
}
