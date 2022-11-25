import { useState } from "react";

const StateTutorial = () => {
  const [inputValue, setInputValue] = useState("Yongsu");

  const onChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  return (
    <div>
      <input onChange={onChange} placeholder="입력해주세요..." />
      {inputValue}
    </div>
  );
};

export default StateTutorial;
