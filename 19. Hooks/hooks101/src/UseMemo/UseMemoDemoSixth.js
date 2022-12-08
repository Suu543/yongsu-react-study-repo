import { useState, useEffect, useMemo } from "react";

const useMemoDemo = () => {
  const [num, setNum] = useState(0);
  const [isKorea, setIsKorea] = useState(true);

  //   const location = {
  //     country: isKorea ? "한국" : "외국",
  //   };

  const location = useMemo(() => {
    return {
      country: isKorea ? "한국" : "외국",
    };
  }, [isKorea]);

  useEffect(() => {
    console.log("useEffect is called...");
  }, [location]);

  return (
    <div>
      <h1>How Often Should You Eat?</h1>
      <input
        type="number"
        value={num}
        onChange={(e) => setNum(e.target.value)}
      />
      <hr />
      <h2>What country are you in right now?</h2>
      <p>Country: {location.country}</p>
      <button onClick={() => setIsKorea(!isKorea)}>Take on a flight</button>
    </div>
  );
};

export default useMemoDemo;
