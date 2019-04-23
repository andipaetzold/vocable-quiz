import { isAfter } from "date-fns";
import Subject from "types/Subject";

export function getTodayCardCount(subject: Subject) {
    return Object.entries(subject.cardsNextQuiz)
        .filter(([date, _]) => !isAfter(date, new Date()))
        .map(([_, count]) => count)
        .reduce((prev, cur) => prev + cur, 0);
}
