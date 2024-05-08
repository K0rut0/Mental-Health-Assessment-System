
export default interface Question {
    question: string;
    id: number;
    survey_id: number;
    scale: number;
    is_reversed: boolean;
}