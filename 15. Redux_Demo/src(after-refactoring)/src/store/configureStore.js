const { createStore } = require("redux");
const { reducer } = require("./bugs");

function configureStore() {
  const store = createStore(reducer);
  console.log("store: ", store);
  return store;
}

module.exports = configureStore;
