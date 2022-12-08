import { useState } from "react";

const hardCalculate = (number) => {
  console.log("hard calculator");
  // Takes Time
  for (let i = 0; i < 99999999999; i++) {}
  return number + 9999999;
};

const easyCalculate = (number) => {
  console.log("easy calculator");
  return number + 1;
};

const UseMemoDemo = () => {
  const [hardNum, setHardNum] = useState(1);
  const [easyNum, setEasyNum] = useState(1);

  const hardSum = hardCalculate(hardNum);
  const easySum = easyCalculate(easyNum);

  return (
    <div>
      <h1>Hard Calculator</h1>
      <input
        type="number"
        value={hardNum}
        onChange={(e) => setHardNum(parseInt(e.target.value))}
      />
      <span> + 9999999 = {hardSum}</span>

      <h1>Easy Calculator</h1>
      <input
        type="number"
        value={easyNum}
        onChange={(e) => setEasyNum(parseInt(e.target.value))}
      />
      <span> + 1 = {easySum}</span>
    </div>
  );
};

export default UseMemoDemo;
