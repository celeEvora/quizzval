import { ArrowLeft, Trophy, RotateCcw } from "lucide-react";
import { UserAnswer, Subject } from "../types";
import Graphs from "./Graphs";

interface ResultsProps {
  subject: Subject;
  week: string;
  answers: UserAnswer[];
  onBack: () => void;
  onRestart: () => void;
}

export default function Results({
  subject,
  week,
  answers,
  onBack,
  onRestart,
}: ResultsProps) {
  const correctAnswers = answers.filter((answer) => answer.isCorrect).length;
  const totalQuestions = answers.length;
  const percentage = Math.round(correctAnswers / totalQuestions) * 100;
  const decimalGrade = (correctAnswers / totalQuestions) * 10;

  const subjectInfo = {
    math: { title: "Matemáticas", icon: "🔢" },
    language: { title: "Lenguaje", icon: "📚" },
  };

  const getMotivationalMessage = () => {
    if (percentage >= 90)
      return {
        message: "¡Excelente trabajo! Eres una estrella 🤩🎉",
        color: "from-yellow-400 to-orange-500",
      };
    if (percentage >= 70)
      return {
        message: "¡Muy bien! Sigue así 👏",
        color: "from-green-400 to-green-500",
      };
    if (percentage >= 50)
      return {
        message: "¡Buen intento! Puedes mejorar 💪",
        color: "from-blue-400 to-blue-500",
      };
    return {
      message: "¡No te rindas! La práctica hace al maestro 🌱",
      color: "from-red-400 to-red-500",
    };
  };

  const motivation = getMotivationalMessage();

  // Agrupar respuestas por tema para análisis
  const topicAnalysis = answers.reduce((acc, answer) => {
    const topic = answer.question.topic || "General";
    if (!acc[topic]) {
      acc[topic] = { correct: 0, total: 0 };
    }
    acc[topic].total++;
    if (answer.isCorrect) {
      acc[topic].correct++;
    }
    return acc;
  }, {} as Record<string, { correct: number; total: number }>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-purple-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="cursor-pointer flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-lg">Volver</span>
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            ¡Test Completado!
          </h1>
          <p className="text-xl text-gray-600">
            {subjectInfo[subject].icon} {subjectInfo[subject].title} - Semana{" "}
            {week.replace("week", "")}
          </p>
        </div>

        {/* Resultado Principal */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-15">
          <div className="text-center">
            <div
              className={`bg-gradient-to-r ${motivation.color} rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center`}
            >
              <Trophy className="w-16 h-16 text-white" />
            </div>

            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {correctAnswers} / {totalQuestions}
            </h2>

            <div
              className="text-4xl font-bold mb-4"
              style={{
                color: motivation.color.includes("yellow")
                  ? "#F59E0B"
                  : motivation.color.includes("green")
                  ? "#10B981"
                  : motivation.color.includes("blue")
                  ? "#3B82F6"
                  : "#8B5CF6",
              }}
            >
              <p>Obtuviste un {decimalGrade}</p>
            </div>

            <p className="text-2xl font-semibold text-gray-700 mb-2">
              {motivation.message}
            </p>
          </div>
        </div>

        <Graphs
          topicAnalysis={topicAnalysis}
          correctAnswers={correctAnswers}
          totalQuestions={totalQuestions}
        />

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRestart}
            className="cursor-pointer flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Intentar de nuevo</span>
          </button>

          <button
            onClick={onBack}
            className="cursor-pointer flex items-center justify-center space-x-2 bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 shadow-lg"
          >
            <span>Elegir otra semana</span>
          </button>
        </div>
      </div>
    </div>
  );
}
