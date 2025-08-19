import { Target, Star } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type GraphsProps = {
  topicAnalysis: Record<string, { correct: number; total: number }>;
  correctAnswers: number;
  totalQuestions: number;
};

export default function Graphs({
  topicAnalysis,
  correctAnswers,
  totalQuestions,
}: GraphsProps) {
  const topicData = Object.entries(topicAnalysis).map(([topic, data]) => ({
    topic: topic.charAt(0).toUpperCase() + topic.slice(1),
    percentage: Math.round((data.correct / data.total) * 100),
    correct: data.correct,
    total: data.total,
  }));

  const pieData = [
    { name: "Correctas", value: correctAnswers, color: "#22c55e" },
    {
      name: "Incorrectas",
      value: totalQuestions - correctAnswers,
      color: "#ef4444",
    },
  ];

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6 mb-15">
        <div>
          <div>
            <div className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5" />
              Resumen General
            </div>
          </div>
          <div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm">Correctas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-sm">Incorrectas</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-lg flex items-center gap-2 mb-4">
            <Star className="w-5 h-5" />
            Por Tema
          </div>
          <div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topicData}>
                  <XAxis dataKey="topic" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`${value}%`, "Porcentaje"]} />
                  <Bar
                    dataKey="percentage"
                    fill="#467DE3"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div>
          <div className="text-lg">Desglose por Tema</div>
        </div>
        <div className="space-y-4 mt-3">
          {topicData.map((topic) => (
            <div
              key={topic.topic}
              className="flex items-center justify-between p-3 bg-white rounded-lg"
            >
              <span className="font-medium capitalize">{topic.topic}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm">
                  {topic.correct}/{topic.total}
                </span>
                <div className="w-20 bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${topic.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-12 text-right">
                  {topic.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
