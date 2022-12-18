import { useState, useEffect } from "react";

const UseCallbackDemo = () => {
  const [num, setNum] = useState(0);
  const [toggle, setToggle] = useState(true);

  const someFunction = () => {
    console.log(`Some Function: number: ${num}`);
    return;
  };

  return (
    <div>
      <input
        type="number"
        value={num}
        onChange={(e) => setNum(e.target.value)}
      />
      <button onClick={() => setToggle(!toggle)}>{toggle.toString()}</button>
      <br />
      <button onClick={someFunction}>Call someFunc</button>
    </div>
  );
};

export default UseCallbackDemo;
