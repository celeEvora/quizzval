import { Calculator, BookOpen } from "lucide-react";
import { Subject } from "../types";

interface SubjectSelectionProps {
  onSelectSubject: (subject: Subject) => void;
}

export default function SubjectSelection({
  onSelectSubject,
}: SubjectSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            ¡Bienvenida a tu App de Estudio! 🤓☝🏼
          </h1>
          <p className="text-xl text-gray-600">
            Elige la materia que quieres estudiar hoy
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <button
            onClick={() => onSelectSubject("math")}
            className="cursor-pointer group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-transparent hover:border-blue-300"
          >
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Calculator className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Matemáticas
              </h2>
              <p className="text-lg text-gray-600">
                Suma, resta, geometría y más 🔢
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelectSubject("language")}
            className="cursor-pointer group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-transparent hover:border-pink-300"
          >
            <div className="text-center">
              <div className="bg-pink-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                <BookOpen className="w-12 h-12 text-pink-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Lenguaje
              </h2>
              <p className="text-lg text-gray-600">
                Gramática, ortografía y más 📚
              </p>
            </div>
          </button>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg">
            <span className="text-2xl">🤓</span>
            <span className="text-lg font-medium text-gray-700">
              ¡Elige una materia para empezar!
            </span>
            <span className="text-2xl">🤓</span>
          </div>
        </div>
      </div>
    </div>
  );
}
