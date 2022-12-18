import { useState } from "react";

const RefIntro = () => {
  const [count, setCount] = useState(0);
  console.log(`렌더링... count: ${count}`);

  return (
    <>
      <h1>{count}번 클릭했습니다!</h1>
      <button onClick={() => setCount(count + 1)}>클릭</button>
    </>
  );
};

export default RefIntro;
