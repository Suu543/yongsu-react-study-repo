import { useState, useEffect } from "react";
import axios from "axios";

const EffectTutorialFourthError = () => {
  const [data, setData] = useState("");

  useEffect(async () => {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    setData(res.data[0].email);
  }, []);

  return (
    <div>
      <h1>UseEffect Tutorial</h1>
      <h2>{data}</h2>
    </div>
  );
};

export default EffectTutorialFourthError;
