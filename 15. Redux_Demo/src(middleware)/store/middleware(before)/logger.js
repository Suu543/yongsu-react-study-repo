const logger = (store) => (next) => (action) => {
  console.log("Store: ", store);
  console.log("Next: ", next);
  console.log("Action: ", action);
};

module.exports = logger;

// Currying
// N ==> 1
