import { format } from "date-fns";
import { useEffect, useState } from "react";
import shuffle from "shuffle-array";
import Card from "../types/Card";
import { DATE_FORMAT } from "../util/constants";
import useCards from "./useCards";

export default function useCardsShuffled(subjectId: string) {
    const { loading, cards } = useCards(subjectId, (ref) => ref.where("nextQuiz", "<=", format(new Date(), DATE_FORMAT)));

    const [state, setState] = useState<{
        loading: boolean;
        cards: Card[];
    }>({ loading: true, cards: [] });

    useEffect(() => {
        if (loading) {
            setState({ cards: [], loading: true });
            return;
        }

        const shuffledCards = [...cards];
        shuffle(shuffledCards);
        setState({ loading: false, cards: shuffledCards });
    }, [cards, loading, setState]);

    return state;
}
