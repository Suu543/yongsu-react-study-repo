const thrid = (store) => (next) => (action) => {
  console.log("----------------------------------------------------------");
  console.log("thrid: ", next);
  // console.log("Store: ", store);
  // console.log("Next: ", next);
  console.log("Action ", action);
  next(action);
};

module.exports = thrid;
