import { useState, useCallback } from "react";
import Child from "./Child";

const ReactMemoUseCallbackDemo = () => {
  const [parentAge, setParentAge] = useState(0);

  const incrementParentAge = () => {
    setParentAge(parentAge + 1);
  };

  const tellMe = useCallback(() => {
    console.log("I love 홍길동");
  }, []);

  console.log("Parent Component is rendered...");

  return (
    <div style={{ border: "2px solid navy", padding: "10px" }}>
      <h1>Parent</h1>
      <p>age: {parentAge}</p>
      <button onClick={incrementParentAge}>Increase Parent Age</button>
      <Child name={"홍길동"} tellMe={tellMe} />
    </div>
  );
};

export default ReactMemoUseCallbackDemo;
