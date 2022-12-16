import { useEffect } from "react";

const Time = () => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // do something in the timeout
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);
};

export default Time;
