import { useState, useEffect } from "react";

const RefAutoCounter = () => {
  const [count, setCount] = useState(0);
  console.log(`렌더링... count: ${count}`);

  useEffect(() => {
    const intervalId = setInterval(() => setCount((count) => count + 1), 1000);
    return () => clearInterval(intervalId);
  }, []);

  return <p>Auto Counter: {count}</p>;
};

export default RefAutoCounter;
