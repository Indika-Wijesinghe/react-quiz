import React from "react";

export default function Question(props) {
  function decodeHTMLEntities(text) {
    let textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  }

  const options = props.options;
  const answers =
    options &&
    options.map((element) => {
      const text = decodeHTMLEntities(element);
      const answer = decodeHTMLEntities(props.correctAnswer);

      return (
        <span
          className={`option ${
            props.showAnswers && text == answer && "answer"
          } ${
            props.showAnswers &&
            props.selected &&
            text != answer &&
            text == props.selected &&
            "wrong-answer"
          }`}
          onClick={(event) => props.selectOption(event, props.qno)}
        >
          {text}
        </span>
      );
    });

  return (
    <>
      <h2>{`${props.qno + 1}. ${decodeHTMLEntities(props.question)}`}</h2>
      <div className="answers">{answers}</div>
    </>
  );
}
