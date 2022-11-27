import { useState, useRef } from "react";

const RefAutoCounterSolution = () => {
  const [count, setCount] = useState(0);
  const intervalId = useRef(null);
  console.log(`렌더링... count: ${count}`);

  const startCounter = () => {
    intervalId.current = setInterval(
      () => setCount((count) => count + 1),
      1000
    );
    console.log(`시작... intervalId: ${intervalId.current}`);
  };

  const stopCounter = () => {
    clearInterval(intervalId.current);
    console.log(`정지... intervalId: ${intervalId.current}`);
  };

  return (
    <>
      <p>자동 카운트: {count}</p>
      <button onClick={startCounter}>시작</button>
      <button onClick={stopCounter}>정지</button>
    </>
  );
};

export default RefAutoCounterSolution;
