// (state, action)
const { WITHDRAW_MONEY, DEPOSIT_MONEY } = require("./actionTypes");

const initialState = {
  amount: 10000,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case WITHDRAW_MONEY:
      return { ...state, amount: state.amount - action.payload };

    case DEPOSIT_MONEY:
      return { ...state, amount: state.amount + action.payload };

    default:
      return state;
  }
};

module.exports = reducer;
