import { Card as AntCard } from "antd";
import { format } from "date-fns";
import useCards from "hooks/useCards";
import useSubject from "hooks/useSubject";
import React, { useEffect, useState } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import shuffle from "shuffle-array";
import QuizCard from "./QuizCard";
import Card from "types/Card";

type Props = {} & RouteComponentProps<{ subjectId: string }>;

export default function Quiz({ match }: Props) {
  const subjectId = match.params.subjectId;
  const { loading: loadingSubject, subject } = useSubject(subjectId);
  const { loading: loadingCards, cards } = useCards(subjectId, ref =>
    ref.where("nextQuiz", "<=", format(new Date(), "YYYY-MM-DD"))
  );
  const [shuffledCards, setShuffledCards] = useState<Card[] | undefined>(
    undefined
  );
  useEffect(() => {
    const newCards = [...cards];
    shuffle(newCards);
    setShuffledCards(newCards);
  }, [cards.map(c => c.updatedTimestamp).reduce((prev, cur) => prev + cur, 0)]);

  if (!loadingCards && cards.length === 0) {
    return <Redirect to="/quiz" />;
  }

  return (
    <AntCard
      title={subject ? subject.name : ""}
      loading={loadingSubject || loadingCards}
    >
      {subject && shuffledCards && shuffledCards.length > 0 && (
        <QuizCard subject={subject} card={shuffledCards[0]} />
      )}
    </AntCard>
  );
}
