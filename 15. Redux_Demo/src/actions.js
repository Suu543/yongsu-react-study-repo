// Event Handler ==> Object를 리턴 ==> type, payload
const actions = require("./actionTypes");

const bugAdded = (description) => {
  return {
    type: actions.BUG_ADDED,
    payload: {
      description,
    },
  };
};

const bugRemoved = (id) => {
  return {
    type: actions.BUG_REMOVED,
    payload: {
      id,
    },
  };
};

const bugResolved = (id) => ({
  type: actions.BUG_RESOLVED,
  payload: {
    id,
  },
});

module.exports = {
  bugAdded,
  bugRemoved,
  bugResolved,
};
