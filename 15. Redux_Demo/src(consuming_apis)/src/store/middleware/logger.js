const logger = (param) => (store) => (next) => (action) => {
  // console.log("Logging: ", param);
  // console.log("Store: ", store);
  // console.log("Next: ", next);
  // console.log("Action ", action);
  next(action);
};

module.exports = logger;
