import { ArrowLeft, Trophy, Star, RotateCcw } from "lucide-react";
import { UserAnswer, Subject } from "../types";

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
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const subjectInfo = {
    math: { title: "Matemáticas", icon: "🔢" },
    language: { title: "Lenguaje", icon: "📚" },
  };

  const getMotivationalMessage = () => {
    if (percentage >= 90)
      return {
        message: "¡Excelente trabajo! Eres una estrella ⭐",
        emoji: "🎉",
        color: "from-yellow-400 to-orange-500",
      };
    if (percentage >= 70)
      return {
        message: "¡Muy bien! Sigue así 👏",
        emoji: "😊",
        color: "from-green-400 to-green-500",
      };
    if (percentage >= 50)
      return {
        message: "¡Buen intento! Puedes mejorar 💪",
        emoji: "😌",
        color: "from-blue-400 to-blue-500",
      };
    return {
      message: "¡No te rindas! La práctica hace al maestro 🌱",
      emoji: "😊",
      color: "from-purple-400 to-purple-500",
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-purple-100 p-4">
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
          <div className="text-8xl mb-4">🎯</div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            ¡Test Completado!
          </h1>
          <p className="text-xl text-gray-600">
            {subjectInfo[subject].icon} {subjectInfo[subject].title} - Semana{" "}
            {week.replace("week", "")}
          </p>
        </div>

        {/* Resultado Principal */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
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
              className="text-6xl font-bold mb-4"
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
              {percentage}%
            </div>

            <p className="text-2xl font-semibold text-gray-700 mb-2">
              {motivation.message}
            </p>

            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-8 h-8 ${
                    i < Math.ceil(percentage / 20)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Análisis por Temas */}
        {Object.keys(topicAnalysis).length > 1 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              📊 Análisis por Temas
            </h3>
            <div className="space-y-4">
              {Object.entries(topicAnalysis).map(([topic, data]) => {
                const topicPercentage = Math.round(
                  (data.correct / data.total) * 100
                );
                return (
                  <div
                    key={topic}
                    className="flex items-center justify-between"
                  >
                    <span className="text-lg font-medium text-gray-700">
                      {topic}
                    </span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            topicPercentage >= 70
                              ? "bg-green-400"
                              : topicPercentage >= 50
                              ? "bg-yellow-400"
                              : "bg-red-400"
                          }`}
                          style={{ width: `${topicPercentage}%` }}
                        />
                      </div>
                      <span className="text-lg font-semibold text-gray-600 w-16">
                        {data.correct}/{data.total}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

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
