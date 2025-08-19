import { useState } from "react";
import SubjectSelection from "./components/SubjectSelection";
import WeekSelection from "./components/WeekSelection";
import Quiz from "./components/quiz";
import Results from "./components/Results";
import { Subject, AppState, UserAnswer } from "./types";
import { questionsData } from "./data/questions";

function App() {
  const [appState, setAppState] = useState<AppState>("subject-selection");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    setAppState("week-selection");
  };

  const handleSelectWeek = (week: string) => {
    setSelectedWeek(week);
    setAppState("quiz");
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

  if (appState === "subject-selection") {
    return <SubjectSelection onSelectSubject={handleSelectSubject} />;
  }

  if (appState === "week-selection" && selectedSubject) {
    return (
      <WeekSelection
        subject={selectedSubject}
        onSelectWeek={handleSelectWeek}
        onBack={handleBackToSubjects}
      />
    );
  }

  if (appState === "quiz" && selectedSubject && selectedWeek) {
    const questions = questionsData[selectedSubject][selectedWeek];
    return (
      <Quiz
        subject={selectedSubject}
        week={selectedWeek}
        questions={questions}
        onComplete={handleQuizComplete}
        onBack={handleBackToWeeks}
      />
    );
  }

  if (appState === "results" && selectedSubject && selectedWeek) {
    return (
      <Results
        subject={selectedSubject}
        week={selectedWeek}
        answers={userAnswers}
        onBack={handleBackToWeeks}
        onRestart={handleRestartQuiz}
      />
    );
  }

  return <SubjectSelection onSelectSubject={handleSelectSubject} />;
}

export default App;
