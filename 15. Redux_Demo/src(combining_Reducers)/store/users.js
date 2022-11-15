const { createSlice } = require("@reduxjs/toolkit");

let lastId = 0;

const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    userAdded: (users, action) => {
      users.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

module.exports = {
  usersReducer: slice.reducer,
  usersActions: slice.actions,
};
