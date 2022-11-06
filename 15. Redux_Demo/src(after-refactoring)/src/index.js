const configureStore = require("./store/configureStore");
const { bugAdded, bugRemoved, bugResolved } = require("./store/bugs");

const store = configureStore();

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(bugAdded("Bug1"));
store.dispatch(bugResolved(1));
store.dispatch(bugRemoved(1));
