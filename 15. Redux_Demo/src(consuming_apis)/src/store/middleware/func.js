// Thunk
const func =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // console.log("Next: ", next);
    // console.log("Action ", action);

    if (typeof action == "function") {
      action(dispatch, getState);
    } else {
      next(action);
    }
  };

module.exports = func;
