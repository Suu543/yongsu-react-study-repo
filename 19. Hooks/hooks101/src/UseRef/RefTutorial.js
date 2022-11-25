import { useRef } from "react";

const RefTutorial = () => {
  const inputRef = useRef(null);
  const onClick = () => {
    console.log(inputRef.current);
    console.log(inputRef.current.value);
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    <div>
      <h1>useRef Tutorial</h1>
      <input type="text" placeholder="Enter Text..." ref={inputRef} />
      <button onClick={onClick}>Change Name</button>
    </div>
  );
};

export default RefTutorial;
