import React, { useState, Suspense } from "react";
import { Subject, AppState, UserAnswer } from "./types";
import { questionsData } from "./data/questions";
import { pickRandomQuestions } from "./utils/randomQuestions";
import { Loader } from "./components/Loader";
const SubjectSelection = React.lazy(
  () => import("./components/SubjectSelection")
);
const WeekSelection = React.lazy(() => import("./components/WeekSelection"));
const Quiz = React.lazy(() => import("./components/Quiz"));
const Results = React.lazy(() => import("./components/Results"));

function App() {
  const [appState, setAppState] = useState<AppState>("subject-selection");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [questionCount, setQuestionCount] = useState<number>(15);

  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    setAppState("week-selection");
  };

  const handleSelectWeek = (week: string, count: number) => {
    setSelectedWeek(week);
    setAppState("quiz");
    setQuestionCount(count);
  };

  const handleQuizComplete = (answers: UserAnswer[]) => {
    setUserAnswers(answers);
    setAppState("results");
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setSelectedWeek(null);
    setUserAnswers([]);
    setAppState("subject-selection");
  };

  const handleBackToWeeks = () => {
    setSelectedWeek(null);
    setUserAnswers([]);
    setAppState("week-selection");
  };

  const handleRestartQuiz = () => {
    setUserAnswers([]);
    setAppState("quiz");
  };

  return (
    <Suspense fallback={<Loader />}>
      {appState === "subject-selection" && (
        <SubjectSelection onSelectSubject={handleSelectSubject} />
      )}
      {appState === "week-selection" && selectedSubject && (
        <WeekSelection
          subject={selectedSubject}
          onSelectWeek={handleSelectWeek}
          onBack={handleBackToSubjects}
        />
      )}
      {appState === "quiz" &&
        selectedSubject &&
        selectedWeek &&
        (() => {
          const allQuestions = questionsData[selectedSubject][selectedWeek];
          const questions = pickRandomQuestions(allQuestions, questionCount);
          return (
            <Quiz
              subject={selectedSubject}
              week={selectedWeek}
              questions={questions}
              onComplete={handleQuizComplete}
              onBack={handleBackToWeeks}
            />
          );
        })()}
      {appState === "results" && selectedSubject && selectedWeek && (
        <Results
          subject={selectedSubject}
          week={selectedWeek}
          answers={userAnswers}
          onBack={handleBackToWeeks}
          onRestart={handleRestartQuiz}
        />
      )}
    </Suspense>
  );
}

export default App;
