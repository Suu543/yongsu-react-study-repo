import React from "react";

function MultiCard(props) {
  const question = props.questionData;
  console.log(question);

  const choices = ["a", "b", "c", "d"];
  const options = question.options.map((option, i) => {
    return (
      <li key={i}>
        {choices[i]}. {option}
      </li>
    );
  });

  return (
    <>
      <div className="card-back">
        <div>AWS Service</div>
        <ul className="multi">{options}</ul>
      </div>
      <div className="card-front">multiChoice Answer</div>
    </>
  );
}

export default MultiCard;
