import { message } from "antd";
import useFirebase from "../../hooks/useFirebase";
import useUser from "../../hooks/useUser";
import Presenter from "../../pages/EditCard/presenter";
import { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import Card from "../../types/Card";

export type Props = RouteComponentProps<{ subjectId: string }>;

export default function CreateCard({
    match: {
        params: { subjectId }
    }
}: Props) {
    const firebase = useFirebase();
    const user = useUser();
    const [key, setKey] = useState(0);
    const [card, setCard] = useState<Pick<Card, "question" | "answer" | "remark">>({ question: "", answer: "", remark: "" });
    const [reverse, setReverse] = useState(true);

    const handleSubmit = async (card: Pick<Card, "question" | "answer" | "remark">) => {
        (async () => {
            await firebase.createCard(user, subjectId, card, reverse);
            message.success("Card was created");
        })();

        setCard({ question: "", answer: "", remark: card.remark });
        setKey(k => k + 1);
    };

    return <Presenter key={key} subjectId={subjectId} card={card} onSubmit={handleSubmit} reverse={reverse} onReverseChange={setReverse} />;
}
