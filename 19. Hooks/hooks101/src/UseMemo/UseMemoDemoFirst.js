import { useState } from "react";

const hardCalculate = (number) => {
  console.log("hard Calculator");
  // Takes Time
  for (let i = 0; i < 99999999999; i++) {}
  return number + 9999999;
};

const UseMemoDemo = () => {
  const [hardNum, setHardNum] = useState(1);
  const hardSum = hardCalculate(hardNum);

  return (
    <div>
      <h1>Hard Calculator</h1>
      <input
        type="number"
        value={hardNum}
        onChange={(e) => setHardNum(parseInt(e.target.value))}
      />
      <span> + 9999999 = {hardSum}</span>
    </div>
  );
};

export default UseMemoDemo;
