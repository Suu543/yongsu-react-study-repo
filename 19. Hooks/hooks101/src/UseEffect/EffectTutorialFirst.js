import { useState, useEffect } from "react";
import axios from "axios";

const EffectTutorialFirst = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/comments").then((res) => {
      //   console.log(res.data);
      setData(res.data[0].email);
      console.log("API WAS CALLED");
    });
  });

  return (
    <div>
      <h1>UseEffect Tutorial</h1>
      <h2>{data}</h2>
    </div>
  );
};

export default EffectTutorialFirst;
