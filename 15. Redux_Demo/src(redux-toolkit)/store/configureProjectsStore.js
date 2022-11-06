const { configureStore } = require("@reduxjs/toolkit");
const { reducer } = require("./projects");

function configureProjectStore() {
  return configureStore({ reducer });
}

module.exports = configureProjectStore;
