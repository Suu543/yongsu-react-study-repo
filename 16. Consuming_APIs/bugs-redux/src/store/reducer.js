const { combineReducers } = require("redux");
const entitiesReducer = require("./entities");

module.exports = combineReducers({
  entities: entitiesReducer,
});
