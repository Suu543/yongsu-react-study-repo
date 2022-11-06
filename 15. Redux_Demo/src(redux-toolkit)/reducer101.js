const { createReducer } = require("@reduxjs/toolkit");
const { bugAdded, bugResolved } = require("./store/bugs");

// Reducer
let lastId = 0;

// createReducer(initialState, actionsMap)
// createReducer([], {
//   bugAdded: (state, action) => {
//     state.push({
//       id: ++lastId,
//       description: action.payload.description,
//       resolved: false,
//     });
//   },
// });

// bugs = state
createReducer([], {
  [bugAdded.type]: (bugs, action) => {
    bugs.push({
      id: ++lastId,
      description: action.payload.description,
      resolved: false,
    });
  },

  [bugResolved.type]: (bugs, action) => {
    const index = bugs.findIndex((bug) => bug.id === action.payload.id);
    bugs[index].resolved = true;
  },
});
