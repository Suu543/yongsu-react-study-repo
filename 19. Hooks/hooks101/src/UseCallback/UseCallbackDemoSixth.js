import { useState } from "react";
import Box from "./Box";

const UseCallbackDemo = () => {
  const [size, setSize] = useState(100);

  const createBoxStyle = () => {
    return {
      backgroundColor: "pink",
      width: `${size}px`,
      height: `${size}px`,
    };
  };

  return (
    <div>
      <input
        type="number"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />
      <Box createBoxStyle={createBoxStyle} />
    </div>
  );
};

export default UseCallbackDemo;
