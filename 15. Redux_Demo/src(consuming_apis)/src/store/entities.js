const { combineReducers } = require("redux");
const { bugsReducer } = require("./bugs");
const { projectsReducer } = require("./projects");
const { usersReducer } = require("./users");

module.exports = combineReducers({
  bugs: bugsReducer,
  projects: projectsReducer,
  users: usersReducer,
});
