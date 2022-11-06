const configureBugStore = require("./store/configureBugsStore");
const { actions } = require("./store/bugs");

const store = configureBugStore();

store.subscribe(() => {
  console.log(store.getState());
});

// store.dispatch(bugAdded("Bug1"));
// store.dispatch(bugResolved(1));
// store.dispatch(bugRemoved(1));

store.dispatch(actions.bugAdded({ description: "Bug 1" }));
store.dispatch(actions.bugAdded({ description: "Bug 2" }));
store.dispatch(actions.bugAdded({ description: "Bug 3" }));
store.dispatch(actions.bugResolved({ id: 1 }));
store.dispatch(actions.bugRemoved({ id: 1 }));
