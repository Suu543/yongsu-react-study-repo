import { useState } from "react";

const StateTutorial = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    counter = counter + 1;
    console.log(counter);
  };

  return (
    <div>
      {counter}
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default StateTutorial;
