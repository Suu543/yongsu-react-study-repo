const { configureStore } = require("@reduxjs/toolkit");
const reducer = require("./reducer");
const logger = require("./middleware/logger");
const toast = require("./middleware/toast");
const api = require("./middleware/api");

module.exports = function () {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        logger({ destination: "console" }),
        toast,
        api
      ),
  });
};
