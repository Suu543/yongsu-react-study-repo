import { useRef, useState } from "react";

const UseRefThird = () => {
  const [count, setCount] = useState(0);

  const handle = () => {
    const updatedCount = count + 1;
    console.log(`Clicked ${updatedCount} times`);
    setCount(updatedCount);
  };

  console.log("I rendered!");

  return <button onClick={handle}>Click Me</button>;
};

export default UseRefThird;
