const { bugsActions, bugsSelectors } = require("./store/bugs");
const { projectsActions } = require("./store/projects");
const { usersActions } = require("./store/users");
const configureBugStore = require("./store/configureStore");

const store = configureBugStore();

// // Purely for Demonstration
// const action = {
//   type: "apiCallBegan", // apiRequest,
//   payload: {
//     url: "/bugs",
//     method: "get",
//     data: {},
//     onSuccess: "bugsReceived",
//     onError: "apiRequestFailed",
//   },
// };

store.dispatch({
  type: "apiCallBegan", // apiRequest,
  payload: {
    url: "/bugs",
    onSuccess: "bugsReceived",
    onError: "apiRequestFailed",
  },
});
