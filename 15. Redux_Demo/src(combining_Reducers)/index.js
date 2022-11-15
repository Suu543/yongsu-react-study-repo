const configureBugStore = require("./store/configureStore");
const { bugsActions, bugsSelectors } = require("./store/bugs");
const { projectsActions } = require("./store/projects");
const { usersActions } = require("./store/users");

const store = configureBugStore();
console.log(store.getState());

// store.subscribe(() => {
//   console.log(store.getState().entities);
//   console.log(store.getState().entities.bugs);
//   console.log(store.getState().entities.projects);
//   console.log(store.getState().entities.users);
// });

store.dispatch(bugsActions.bugAdded({ description: "Bug 1" }));
store.dispatch(bugsActions.bugAdded({ description: "Bug 2" }));
store.dispatch(bugsActions.bugAdded({ description: "Bug 3" }));
store.dispatch(bugsActions.bugAdded({ description: "Bug 4" }));
store.dispatch(bugsActions.bugResolved({ id: 1 }));
store.dispatch(bugsActions.bugResolved({ id: 2 }));
store.dispatch(bugsActions.bugResolved({ id: 3 }));
store.dispatch(bugsActions.bugResolved({ id: 4 }));

store.dispatch(bugsActions.bugAssignedToUser({ bugId: 1, userId: 1 }));
store.dispatch(bugsActions.bugResolved({ id: 1 }));

const bugs = bugsSelectors.getBugsByUser(1)(store.getState());
console.log("Bugs: ", bugs);

store.dispatch(bugsActions.bugRemoved({ id: 1 }));
store.dispatch(bugsActions.bugRemoved({ id: 2 }));
store.dispatch(bugsActions.bugRemoved({ id: 3 }));
store.dispatch(bugsActions.bugRemoved({ id: 4 }));

store.dispatch(projectsActions.projectAdded({ name: "Project 1" }));
store.dispatch(projectsActions.projectAdded({ name: "Project 2" }));
store.dispatch(projectsActions.projectAdded({ name: "Project 3" }));
store.dispatch(projectsActions.projectAdded({ name: "Project 4" }));

store.dispatch(usersActions.userAdded({ name: "User 1" }));
store.dispatch(usersActions.userAdded({ name: "User 2" }));
store.dispatch(usersActions.userAdded({ name: "User 3" }));
store.dispatch(usersActions.userAdded({ name: "User 4" }));
