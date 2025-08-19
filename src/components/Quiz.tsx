import { useState } from "react";
import { ArrowLeft, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Question, UserAnswer, Subject } from "../types";

interface QuizProps {
  subject: Subject;
  week: string;
  questions: Question[];
  onComplete: (answers: UserAnswer[]) => void;
  onBack: () => void;
}

export default function Quiz({
  subject,
  week,
  questions,
  onComplete,
  onBack,
}: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const subjectInfo = {
    math: { title: "Matemáticas", icon: "🔢" },
    language: { title: "Lenguaje", icon: "📚" },
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;

    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    const isCorrect = answerIndex === question.answer;
    const answer: UserAnswer = {
      questionIndex: currentQuestion,
      selectedAnswer: answerIndex,
      isCorrect,
      question,
    };

    setUserAnswers((prev) => [...prev, answer]);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(userAnswers);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="cursor-pointer flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-lg">Volver</span>
          </button>

          <div className="text-center">
            <span className="text-lg font-medium text-gray-600">
              {subjectInfo[subject].icon} {subjectInfo[subject].title} - Semana{" "}
              {week.replace("week", "")}
            </span>
          </div>

          <div className="text-lg font-medium text-gray-600">
            {currentQuestion + 1} / {questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-full h-3 mb-8 shadow-inner">
          <div
            className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center leading-relaxed">
            {question.question}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, index) => {
              let buttonStyle =
                "w-full p-4 text-left rounded-xl border-2 transition-all duration-300 text-lg cursor-pointer";

              if (!showFeedback) {
                buttonStyle +=
                  " border-gray-200 hover:border-purple-300 hover:bg-purple-50";
              } else {
                if (index === question.answer) {
                  buttonStyle += " border-green-400 bg-green-50 text-green-800";
                } else if (
                  index === selectedAnswer &&
                  index !== question.answer
                ) {
                  buttonStyle += " border-red-400 bg-red-50 text-red-800";
                } else {
                  buttonStyle += " border-gray-200 bg-gray-50 text-gray-500";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={buttonStyle}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showFeedback && (
                      <div>
                        {index === question.answer && (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        )}
                        {index === selectedAnswer &&
                          index !== question.answer && (
                            <XCircle className="w-6 h-6 text-red-600" />
                          )}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {showFeedback && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div
              className={`flex items-start space-x-3 ${
                selectedAnswer === question.answer
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              {selectedAnswer === question.answer ? (
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
              ) : (
                <XCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
              )}
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {selectedAnswer === question.answer
                    ? "¡Correcto! 🎉"
                    : "¡Ups! 😊"}
                </h3>
                <p className="text-lg text-gray-700">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {showFeedback && (
          <div className="text-center">
            <button
              onClick={handleNext}
              className="cursor-pointer inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <span>
                {isLastQuestion ? "¡Ver resultados!" : "Siguiente pregunta"}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
