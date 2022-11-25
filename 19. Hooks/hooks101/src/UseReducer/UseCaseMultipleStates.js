import { useReducer } from "react";

const reducer = (prevState, action) => {
  let temp = "";

  switch (action.type) {
    case "ADD":
      temp = [...prevState];
      temp.push(action.payload);
      return temp;
    case "REMOVE":
      temp = [...prevState];
      temp.pop();
      return temp;
    case "CLEAR":
      return [];
    default:
      break;
  }
};

const UseCaseMultipleStates = () => {
  const [state, dispatch] = useReducer(reducer, ["Intitial Value"]);
  console.log(state);

  const addHandler = () => {
    dispatch({ type: "ADD", payload: Math.round(Math.random() * 100 + 100) });
  };
  const removeHandler = () => {
    dispatch({ type: "REMOVE" });
  };
  const clearHandler = () => {
    dispatch({ type: "CLEAR" });
  };

  return (
    <>
      <hr />
      <h2>useReducer use case</h2>
      <h3>Manage multiple states: modify an array</h3>
      <button onClick={addHandler}>[+] 배열에 무작위 값 추가하기</button>
      <button onClick={removeHandler}>[-] 배열 마지막 값 제거하기</button>
      <button onClick={clearHandler}>[X] 배열 비우기</button>
      <p>Shopping Cart Array:</p>
      <p>
        <b>
          {state.length === 0 && "(empty)"}
          {state.join(" - ")}
        </b>
      </p>
    </>
  );
};

export default UseCaseMultipleStates;
