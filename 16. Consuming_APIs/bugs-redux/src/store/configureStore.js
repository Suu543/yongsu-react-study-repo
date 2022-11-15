const { configureStore } = require("@reduxjs/toolkit");
const reducer = require("./reducer");
const { logger } = require("redux-logger");
const api = require("./middleware/api");

module.exports = function () {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(logger, api),
  });
};
