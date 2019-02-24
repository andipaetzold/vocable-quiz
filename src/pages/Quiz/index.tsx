import { Card } from "antd";
import { format } from "date-fns";
import useCards from "hooks/useCards";
import useSubject from "hooks/useSubject";
import React from "react";
import { RouteComponentProps, Redirect } from "react-router";
import QuizCard from "./QuizCard";

type Props = {} & RouteComponentProps<{ subjectId: string }>;

export default function Quiz({ match }: Props) {
  const subjectId = match.params.subjectId;
  const { loading: loadingSubject, subject } = useSubject(subjectId);
  const { loading: loadingCards, cards } = useCards(subjectId, ref =>
    ref.where("nextQuiz", "<=", format(new Date(), "YYYY-MM-DD"))
  );

  if (!loadingCards && cards.length === 0) {
    return <Redirect to="/quiz" />;
  }

  return (
    <Card
      title={subject ? subject.name : ""}
      loading={loadingSubject || loadingCards}
    >
      {subject && cards && <QuizCard subject={subject} card={cards[0]} />}
    </Card>
  );
}
