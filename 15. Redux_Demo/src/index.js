const store = require("./store");
const { bugAdded, bugRemoved, bugResolved } = require("./actions");

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(bugAdded("Bug1"));
store.dispatch(bugResolved(1));
store.dispatch(bugRemoved(1));
