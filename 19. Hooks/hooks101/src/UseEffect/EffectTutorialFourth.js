import { useState, useEffect } from "react";
import axios from "axios";

const EffectTutorialFourth = () => {
  const [data, setData] = useState("");

  const getEmailOutside = async () => {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );

    setData(res.data[0].email);
    console.log("API WAS CALLED Second");
  };

  // Solution #1: 비동기 함수를 useEffect Hook 내부에 정의 후 useEffect Hook에서 호출
  useEffect(() => {
    const getEmail = async () => {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );

      setData(res.data[0].email);
      console.log("API WAS CALLED First");
    };

    getEmail();
  }, []);

  // Solution #2: 비동기 함수를 useEffect Hook 외부에 정의 후 useEffect Hook에서 호출
  useEffect(() => {
    getEmailOutside();
  }, []);

  // Solution #3: IIFE - 함수가 정의되자마자 실행되는 JS 기술
  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );

      setData(res.data[0].email);
      console.log("API WAS CALLED Third");
    })();
  }, []);

  return (
    <div>
      <h1>UseEffect Tutorial</h1>
      <h2>{data}</h2>
    </div>
  );
};

export default EffectTutorialFourth;
