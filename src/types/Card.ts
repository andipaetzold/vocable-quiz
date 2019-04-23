export default interface Card {
    id: string;
    question: string;
    answer: string;
    remark: string;
    phase: number;
    nextQuiz: string | null;
    createdAt: string;

    createdTimestamp: number;
    updatedTimestamp: number;
}
