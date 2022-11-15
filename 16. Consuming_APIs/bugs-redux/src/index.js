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

const {
  bugsActions,
  bugsSelectors,
  loadBugs,
  addBug,
  resolveBug,
} = require("./store/bugs");
const { projectsActions } = require("./store/projects");
const { usersActions } = require("./store/users");
const configureBugStore = require("./store/configureStore");
const { apis } = require("./store/api");

const store = configureBugStore();

store.subscribe(() => {
  console.log("bugs: ", store.getState().entities.bugs.list);
});

store.dispatch(loadBugs());
setTimeout(() => store.dispatch(resolveBug(1)), 2000);
// setTimeout(() => store.dispatch(assignBugToUser(1, 4)), 2000);
