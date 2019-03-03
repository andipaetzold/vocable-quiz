export default interface Subject {
  id: string;
  name: string;

  cardsCount: number;
  cardsNextQuiz: { [date: string]: number };
  cardsPhase: { [phase: number]: number };

  aggregatedEvents: string[];
}
