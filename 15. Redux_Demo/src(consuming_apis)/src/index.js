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
  assignBugToUser,
} = require("./store/bugs");
const { projectsActions } = require("./store/projects");
const { usersActions } = require("./store/users");
const configureBugStore = require("./store/configureStore");
const { apis } = require("./store/api");

const store = configureBugStore();

// store.subscribe(() => {
//   console.log(store.getState());
// });

store.dispatch(loadBugs());
// store.dispatch(addBug({ description: "a" }));

// 2초 후에 loadBugs() 함수를 한 번더 호출해보겠습니다.
// setTimeout(() => {
//   store.dispatch(loadBugs());
// }, 2000);

setTimeout(() => store.dispatch(resolveBug(1)), 2000);
// setTimeout(() => store.dispatch(assignBugToUser(1, 4)), 2000);
