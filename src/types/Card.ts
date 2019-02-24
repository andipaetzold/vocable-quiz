export default interface Card {
  id: string;
  question: string;
  answer: string;
  phase: 1 | 2 | 3 | 4 | 5 | 6;
  nextQuiz: string | null;
  createdAt: string;
}
