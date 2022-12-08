import { useState, useEffect } from "react";

const UseCallbackDemo = () => {
  const [num, setNum] = useState(0);

  const someFunction = () => {
    console.log(`Some Function: number: ${num}`);
    return;
  };

  useEffect(() => {
    console.log("someFunction is changed...");
  }, [someFunction]);

  return (
    <div>
      <input
        type="number"
        value={num}
        onChange={(e) => setNum(e.target.value)}
      />
      <br />
      <button onClick={someFunction}>Call someFunc</button>
    </div>
  );
};

export default UseCallbackDemo;
