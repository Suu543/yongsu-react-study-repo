// const logger = (store) => (next) => (action) => {
//   // 실제 Redux Store와는 다릅니다.
//   console.log("Store: ", store);

//   // Reducer를 참조하고 있습니다.
//   console.log("Next: ", next);
//   //  next(action);
//   console.log("Action ", action);
// };

const parametizeLogger = (param) => (store) => (next) => (action) => {
  console.log("Level 1");
  console.log("Logging: ", param);
  console.log("Store: ", store);
  console.log("Next: ", next);
  console.log("Action ", action);
  //   console.log(next(action));
  next(action);
};

// const logger =
//   ({ getState, dispatch }) =>
//   (next) =>
//   (action) => {
//     // 실제 Redux Store와는 다릅니다.
//     console.log("Store: ", store);

//     // Reducer를 참조하고 있습니다.
//     console.log("Next: ", next);
//     //  next(action);
//     console.log("Action ", action);
//   };

// Currying = SNA (Store Next Action)
// N => 1 (Single Parameter)

module.exports = {
  parametizeLogger,
};
