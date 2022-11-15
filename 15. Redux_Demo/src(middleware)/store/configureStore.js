const { configureStore } = require("@reduxjs/toolkit");
const reducer = require("./reducer");
const { parametizeLogger } = require("./middleware/logger");
const toast = require("./middleware/toast");
const func = require("./middleware/func");

// module.exports = function () {
//   return configureStore({
//     reducer,
//     middleware: [parametizeLogger({ destination: "console" }), func],
//   });
// };

module.exports = function () {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        parametizeLogger({ destination: "console" }),
        toast
      ),
  });
};
