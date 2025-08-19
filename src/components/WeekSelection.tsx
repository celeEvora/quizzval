import { ArrowLeft, Calendar, Star } from "lucide-react";
import { Subject } from "../types";
import { questionsData } from "../data/questions";

interface WeekSelectionProps {
  subject: Subject;
  onSelectWeek: (week: string) => void;
  onBack: () => void;
}

export default function WeekSelection({
  subject,
  onSelectWeek,
  onBack,
}: WeekSelectionProps) {
  const subjectData = questionsData[subject];
  const weeks = Object.keys(subjectData);

  const subjectInfo = {
    math: {
      title: "Matemáticas",
      icon: "🔢",
      color: "from-blue-400 to-blue-600",
      bgColor: "from-blue-100 to-indigo-100",
    },
    language: {
      title: "Lenguaje",
      icon: "📚",
      color: "from-pink-400 to-pink-600",
      bgColor: "from-pink-100 to-purple-100",
    },
  };

  const current = subjectInfo[subject];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${current.bgColor} p-4`}>
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
          <div className="text-8xl mb-4">{current.icon}</div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            {current.title}
          </h1>
          <p className="text-xl text-gray-600">
            Selecciona la semana que quieres estudiar
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weeks.map((week, index) => {
            const questionCount = subjectData[week].length;
            return (
              <button
                key={week}
                onClick={() => onSelectWeek(week)}
                className="cursor-pointer group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-center">
                  <div
                    className={`bg-gradient-to-r ${current.color} rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl`}
                  >
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Semana {index + 1}
                  </h3>
                  <div className="flex items-center justify-center space-x-1 text-gray-600 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{questionCount} preguntas</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg">
            <span className="text-2xl">🎯</span>
            <span className="text-lg font-medium text-gray-700">
              ¡Elige una semana para comenzar tu test!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
