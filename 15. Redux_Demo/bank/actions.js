const { WITHDRAW_MONEY, DEPOSIT_MONEY } = require("./actionTypes");
// console.log("actions: ", actions);

const withdrawMoney = (amount) => {
  return {
    type: WITHDRAW_MONEY,
    payload: amount,
  };
};

const depositMoney = (amount) => {
  return {
    type: DEPOSIT_MONEY,
    payload: amount,
  };
};

module.exports = {
  withdrawMoney,
  depositMoney,
};
