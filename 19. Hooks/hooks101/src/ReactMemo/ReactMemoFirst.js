import { useState } from "react";
import Child from "./Child";

const ReactMemoFirst = () => {
  const [parentAge, setParentAge] = useState(0);
  const [childAge, setChildAge] = useState(0);

  const incrementParentAge = () => {
    setParentAge(parentAge + 1);
  };

  const incrementChildAge = () => {
    setChildAge(childAge + 1);
  };

  console.log("Parent Component is rendered...");

  return (
    <div style={{ border: "2px solid navy", padding: "10px" }}>
      <h1>Parent</h1>
      <p>age: {parentAge}</p>
      <button onClick={incrementParentAge}>Increase Parent Age</button>
      <button onClick={incrementChildAge}>Increase Child Age</button>
      <Child name="홍길동" age={childAge} />
    </div>
  );
};

export default ReactMemoFirst;
