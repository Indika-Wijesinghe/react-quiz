import React from "react";

export default function WelcomeScreen(props) {
  return (
    <div className="welcome-screen">
      <h1>Quizzical</h1>
      <p>Click to start the quiz</p>
      <button onClick={props.startQuiz}>Start Quiz</button>
    </div>
  );
}
