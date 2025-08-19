import { useState } from "react";
import { Subject, AppState, UserAnswer } from "./types";
import { questionsData } from "./data/questions";
import { pickRandomQuestions } from "./utils/randomQuestions";
import SubjectSelection from "./components/SubjectSelection";
import WeekSelection from "./components/WeekSelection";
import Quiz from "./components/Quiz";
import Results from "./components/Results";

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
