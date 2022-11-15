const { configureStore } = require("@reduxjs/toolkit");
const reducer = require("./reducer");

module.exports = function () {
  return configureStore({ reducer });
};
