import React from "react";
import Question from "./Question";

export default function QuizScreen() {
  const [questions, setQuestions] = React.useState("");
  const [showAnswers, setShowAnswers] = React.useState(false);
  const [reset, setReset] = React.useState(false);

  function resetQeustions() {
    setShowAnswers(false);
    setReset((preSetReset) => !preSetReset);
    const element = document.getElementById("score");
    element.textContent = ``;
  }

  function shuffle(correctAnswer, incorrectAnswers) {
    let arr = [correctAnswer, ...incorrectAnswers];

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  function setAnswersArray(arrQuestions) {
    setQuestions(() => {
      return arrQuestions.map((element) => {
        const arr = shuffle(element.correct_answer, element.incorrect_answers);
        return { ...element, options: arr };
      });
    });
  }

  React.useEffect(() => {
    let questionsObj;
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => setAnswersArray(data.results));
  }, [reset]);

  function selectOption(event, questionNo) {
    setQuestions((preQuestions) => {
      const spanElement = event.target;
      const parentNode = spanElement.parentNode;
      const childNodes = parentNode.childNodes;

      childNodes.forEach((node) => {
        node.classList.remove("selected");
      });

      spanElement.classList.add("selected");
      preQuestions[questionNo].selected = spanElement.textContent;

      return preQuestions;
    });
  }

  function checkAnswers() {
    const allAnswered = questions.every(
      (question) => question.selected != undefined
    );

    if (allAnswered) {
      setShowAnswers(true);
      let correctCount = 0;
      questions.map((question) => {
        if (question.selected == question.correct_answer) {
          correctCount = correctCount + 1;
        }
      });
      const element = document.getElementById("score");
      element.textContent = `Your Score: ${correctCount}/5`;
    } else {
      alert("Answer all questions!");
    }
  }

  const questionArray =
    questions &&
    questions.map((element, index) => {
      return (
        <Question
          key={index}
          qno={index}
          question={element.question}
          correctAnswer={element.correct_answer}
          wrongAnswers={element.incorrect_answers}
          selectOption={selectOption}
          showAnswers={showAnswers}
          options={element.options}
          selected={element.selected}
        />
      );
    });

  return (
    <div className="quiz-screen">
      <div>{questionArray}</div>
      {!showAnswers ? (
        <button onClick={checkAnswers}>Check Answers</button>
      ) : (
        <>
          <button onClick={resetQeustions}>Start Again</button>
        </>
      )}
      <span id="score"></span>
    </div>
  );
}
