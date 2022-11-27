import { useEffect } from "react";

const Socket = () => {
  useEffect(() => {
    const protocols = "";
    const socket = new WebSocket("url...", protocols);

    return () => socket.close();
  }, []);

  return <h2>Socket</h2>;
};

export default Socket;
