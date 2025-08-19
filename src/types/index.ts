export interface Question {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  topic?: string;
}

export interface WeekData {
  [key: string]: Question[];
}

export interface SubjectData {
  [subject: string]: WeekData;
}

export interface UserAnswer {
  questionIndex: number;
  selectedAnswer: number;
  isCorrect: boolean;
  question: Question;
}

export type Subject = "math" | "language";
export type AppState =
  | "subject-selection"
  | "week-selection"
  | "quiz"
  | "results";
