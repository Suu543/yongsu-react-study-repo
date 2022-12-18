import { useReducer } from "react";

// const ReducerTutorial = () => {
//   const [count, setCount] = useState(0);
//   const [showText, setShowText] = useState(false);

//   return (
//     <div>
//       <h1>{count}</h1>
//       <button
//         onClick={() => {
//           setCount(count + 1);
//           setShowText(!showText);
//         }}
//       >
//         Click Here!
//       </button>

//       {showText && <p>This is a text</p>}
//     </div>
//   );
// };

// export default ReducerTutorial;
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1, showText: state.showText };
    case "toggleShowText":
      return { count: state.count, showText: !state.showText };
    default:
      return state;
  }
};

const ReducerTutorial = () => {
  // 모든 state를 담을 수 있는 변수 선언
  // dispatch: 값 변화에 사용함
  // reducer 함수, {}: 초기값
  const [state, dispatch] = useReducer(reducer, { count: 0, showText: true });

  return (
    <div>
      <h1>{state.count}</h1>
      <button
        onClick={() => {
          dispatch({ type: "INCREMENT" });
          dispatch({ type: "toggleShowText" });
        }}
      >
        Click Here!
      </button>

      {state.showText && <p>This is a text</p>}
    </div>
  );
};

export default ReducerTutorial;
