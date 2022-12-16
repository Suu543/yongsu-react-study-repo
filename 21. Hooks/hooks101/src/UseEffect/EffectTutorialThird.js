import { useState, useEffect } from "react";
import axios from "axios";

const EffectTutorialThird = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/comments").then((res) => {
      //   console.log(res.data);
      let ranNum = Math.floor(Math.random() * 499) + 1;
      setData(res.data[ranNum].email);
      console.log("API WAS CALLED");
    });
  }, []);

  return (
    <div>
      <h1>UseEffect Tutorial</h1>
      <h2>{data}</h2>
    </div>
  );
};

export default EffectTutorialThird;
