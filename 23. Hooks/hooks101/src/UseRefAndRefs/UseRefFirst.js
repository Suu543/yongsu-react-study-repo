import { useRef } from "react";

const MyComponent = () => {
  const reference = useRef(null);

  const refHandler = () => {
    const newValue = "";
    // ref 값에 접근하고 싶은 경우
    const value = reference.current;

    // ref 값을 갱신하고 싶은 경우
    value.current = newValue;
  };

  return <button onClick={refHandler}>Click me</button>;
};

export default MyComponent;
