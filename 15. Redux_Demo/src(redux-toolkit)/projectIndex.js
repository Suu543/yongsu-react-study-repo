const configureProjectStore = require("./store/configureProjectsStore");
const { actions } = require("./store/projects");

const store = configureProjectStore();

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(actions.projectAdded({ name: "yongsu" }));
