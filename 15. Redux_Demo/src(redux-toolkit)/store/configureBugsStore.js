const { configureStore } = require("@reduxjs/toolkit");
const { reducer } = require("./bugs");

function configureBugStore() {
  return configureStore({ reducer });
}

module.exports = configureBugStore;
