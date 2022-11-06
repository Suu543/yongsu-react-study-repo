const { withdrawMoney, depositMoney } = require("./actions");
const store = require("./store");

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(withdrawMoney(5000));
store.dispatch(depositMoney(10000));
