import { useState } from "react";
import { ArrowLeft, BookCheck } from "lucide-react";
import { cn } from "../utils/tailwind";
import { Subject } from "../types";
import { questionsData } from "../data/questions";
import bgMath from "../assets/img/bg-math.webp";
import bgLanguage from "../assets/img/bg-language.webp";

interface WeekSelectionProps {
  subject: Subject;
  onSelectWeek: (week: string, count: number) => void;
  onBack: () => void;
}

export default function WeekSelection({
  subject,
  onSelectWeek,
  onBack,
}: WeekSelectionProps) {
  const subjectData = questionsData[subject];
  const weeks = Object.keys(subjectData);

  const [selectedCount, setSelectedCount] = useState<number>(15);

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
      color: "from-orange-400 to-orange-600",
      bgColor: "from-orange-100 to-yellow-100",
    },
  };

  const current = subjectInfo[subject];

  return (
    <div
      className="min-h-screen px-4 py-10 relative"
      style={{
        backgroundImage: {
          math: `linear-gradient(rgba(191,219,254,1), rgba(191,219,254,0.8)), url(${bgMath})`,
          language: `linear-gradient(rgba(254,215,170,1), rgba(254,215,170,0.8)), url(${bgLanguage})`,
        }[subject],
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="cursor-pointer flex items-center space-x-2 text-gray-700 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-lg">Volver</span>
          </button>
        </div>

        <div className="text-center mb-10">
          <div className="text-8xl mb-4">{current.icon}</div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            {current.title}
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Selecciona la semana que quieres estudiar y el número de preguntas
          </p>
        </div>

        <div className="mt-6 flex gap-2 justify-center mb-12 flex-wrap">
          {[10, 15, 20, 25].map((num) => (
            <button
              key={num}
              onClick={() => setSelectedCount(num)}
              className={cn(
                "cursor-pointer px-4 py-2 rounded-lg shadow-xs hover:shadow-md transform hover:scale-105 transition-transform duration-300",
                selectedCount === num ? "bg-gray-800 text-white" : "bg-white"
              )}
            >
              {num} preguntas
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weeks.map((week) => {
            const weekNumber = week.replace("week", "");
            return (
              <button
                key={week}
                onClick={() => onSelectWeek(week, selectedCount)}
                className="cursor-pointer group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-center">
                  <div
                    className={`bg-gradient-to-r ${current.color} rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl`}
                  >
                    <BookCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Semana {weekNumber}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
