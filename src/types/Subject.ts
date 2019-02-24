export default interface Subject {
  id: string;
  name: string;

  cards: number;
  nextQuiz: { [date: string]: number };
}
