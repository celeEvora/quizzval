import { Question } from "../types";

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export function pickRandomQuestions(
  questions: Question[],
  count: number
): Question[] {
  const shuffled = shuffleArray(questions);
  const selected = shuffled.slice(0, count);

  return selected.map((question) => shuffleOptions(question));
}

// Función para mezclar opciones de cada pregunta
function shuffleOptions(question: Question): Question {
  const options = [...question.options];
  const correctAnswer = question.answer;

  const shuffled = options
    .map((option, index) => ({ option, index }))
    .sort(() => Math.random() - 0.5);

  const newAnswer = shuffled.findIndex((o) => o.index === correctAnswer);

  return {
    ...question,
    options: shuffled.map((s) => s.option),
    answer: newAnswer,
  };
}
