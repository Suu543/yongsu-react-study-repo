const redux = require("redux");
const reduxLogger = require("redux-logger");
const reducer = require("./reducer");

const createStore = redux.createStore;

const logger = reduxLogger.createLogger();
const store = createStore(reducer, redux.applyMiddleware(logger));

module.exports = store;
