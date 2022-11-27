import { useState, useEffect } from "react";

function RandomChild() {
  const [state, setState] = useState(0);

  useEffect(() => {
    console.log("Got Here");

    setTimeout(() => {
      setState(1);
    }, 3000);
  }, []);

  return <>RandomChild</>;
}

function RandomParent() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 1000);
  }, []);

  return <div>{show && <RandomChild />}</div>;
}

export default RandomParent;
