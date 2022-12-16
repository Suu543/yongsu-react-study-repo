import { useRef } from "react";

const LogButtonClicks = () => {
  const countRef = useRef(0);

  const handleCount = () => {
    countRef.current++;
    console.log(`Clicked ${countRef.current} times`);
  };

  console.log("I rendered!");

  return <button onClick={handleCount}>Click Me</button>;
};

export default LogButtonClicks;
