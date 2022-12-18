import { useState } from "react";
import Child from "./Child";

const ReactMemoUseMemo = () => {
  const [parentAge, setParentAge] = useState(0);

  const incrementParentAge = () => {
    setParentAge(parentAge + 1);
  };

  const name = {
    lastName: "홍",
    firstName: "길동",
  };

  console.log("Parent Component is rendered...");

  return (
    <div style={{ border: "2px solid navy", padding: "10px" }}>
      <h1>Parent</h1>
      <p>age: {parentAge}</p>
      <button onClick={incrementParentAge}>Increase Parent Age</button>
      <Child name={name} />
    </div>
  );
};

export default ReactMemoUseMemo;
