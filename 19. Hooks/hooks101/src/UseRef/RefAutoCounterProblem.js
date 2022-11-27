import { useState } from "react";

const RefAutoCounterProblem = () => {
  const [count, setCount] = useState(0);

  let intervalId;

  const startCounter = () => {
    intervalId = setInterval(() => setCount((count) => count + 1), 1000);
  };

  const stopCounter = () => {
    clearInterval(intervalId);
  };

  return (
    <>
      <p>자동 카운트: {count}</p>
      <button onClick={startCounter}>시작</button>
      <button onClick={stopCounter}>정지</button>
    </>
  );
};

export default RefAutoCounterProblem;
