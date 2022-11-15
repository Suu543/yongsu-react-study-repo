const second = (store) => (next) => (action) => {
  console.log("----------------------------------------------------------");
  console.log("second: ", next);
  // console.log("Store: ", store);
  // console.log("Next: ", next);
  console.log("Action ", action);
  next(action);
};

module.exports = second;
