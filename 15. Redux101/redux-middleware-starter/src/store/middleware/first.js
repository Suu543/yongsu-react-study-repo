const first = (store) => (next) => (action) => {
  console.log("----------------------------------------------------------");
  console.log("First: ", next);
  // console.log("Store: ", store);
  // console.log("Next: ", next);
  console.log("Action ", action);
  next(action);
};

module.exports = first;
