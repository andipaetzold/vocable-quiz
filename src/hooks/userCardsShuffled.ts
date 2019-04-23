import { format } from "date-fns";
import { useEffect, useState } from "react";
import shuffle from "shuffle-array";
import Card from "types/Card";
import useCards from "./useCards";

export default function useCardsShuffled(subjectId: string) {
    const { loading, cards } = useCards(subjectId, ref => ref.where("nextQuiz", "<=", format(new Date(), "YYYY-MM-DD")));

    const [state, setState] = useState<{
        loading: boolean;
        cards: Card[];
    }>({ loading: true, cards: [] });

    useEffect(() => {
        if (loading) {
            setState({ ...state, loading: true });
            return;
        }

        const shuffledCards = [...cards];
        shuffle(shuffledCards);
        setState({ loading: false, cards: shuffledCards });
    }, [cards]);

    return state;
}
