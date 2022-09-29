import React from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import QuizScreen from "./components/QuizScreen";

export default function App() {
  const [gameStarted, setGameStarted] = React.useState(false);

  function startQuiz() {
    setGameStarted(true);
  }

  return (
    <>
      <div className="quiz-window">
        {!gameStarted ? (
          <WelcomeScreen startQuiz={startQuiz} />
        ) : (
          <QuizScreen />
        )}
      </div>
      ;
    </>
  );
}
