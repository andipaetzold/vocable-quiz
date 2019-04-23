import { Card as AntCard } from "antd";
import useFirebase from "hooks/useFirebase";
import useCardsShuffled from "hooks/userCardsShuffled";
import useSubject from "hooks/useSubject";
import useUser from "hooks/useUser";
import React, { useEffect, useState } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import Card from "types/Card";
import QuizCard from "./QuizCard";

type Props = {} & RouteComponentProps<{ subjectId: string }>;

export default function Quiz({ match }: Props) {
    const subjectId = match.params.subjectId;

    const firebase = useFirebase();
    const user = useUser();
    const { loading: loadingSubject, subject } = useSubject(subjectId);
    const { loading: loadingCards, cards: shuffledCards } = useCardsShuffled(subjectId);
    const [cards, setCards] = useState<Card[] | undefined>(undefined);
    const [cardIndex, setCardId] = useState(0);

    useEffect(() => {
        if (loadingCards) {
            return;
        }

        setCards(shuffledCards);
    }, [loadingCards]);

    if (loadingCards || loadingSubject || cards === undefined || subject === undefined) {
        return null;
    }

    if (cards.length === cardIndex) {
        return <Redirect to="/quiz" />;
    }

    const card = cards[cardIndex];
    return (
        <AntCard title={subject.name}>
            <QuizCard
                card={card}
                correct={() => {
                    firebase.updatePhase(user, subject.id, card.id, card.phase + 1);
                    setCardId(cardIndex + 1);
                }}
                wrong={() => {
                    firebase.updatePhase(user, subject.id, card.id, 1);
                    setCardId(cardIndex + 1);
                }}
            />
        </AntCard>
    );
}
