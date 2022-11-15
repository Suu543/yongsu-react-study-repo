const { createSlice, createSelector } = require("@reduxjs/toolkit");
const moment = require("moment");
const { apis } = require("./api");

// let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    // bugs/bugsReceived
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    bugAssignedToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    // bugAdded: (bugs, action) => {
    //   bugs.list.push({
    //     id: ++lastId,
    //     description: action.payload.description,
    //     resolved: false,
    //   });
    // },

    // command - event
    // addBug - bugAdded
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },

    // resolveBug (command) -  bugResolved (event)
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },

    bugRemoved: (bugs, action) => {
      bugs.list.filter((bug) => bug.id !== action.payload.id);
    },
  },
});

const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bug.resolved)
);

const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );

const url = "/bugs";

// Action Creators
// () => fn(dispatch, getState)

const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  // console.log(lastFetch);
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

  if (diffInMinutes < 10) return;

  dispatch(
    apis.apiCallBegan({
      url,
      onStart: slice.actions.bugsRequested.type,
      onSuccess: slice.actions.bugsReceived.type,
      onError: slice.actions.bugsRequestFailed.type,
    })
  );
};

const addBug = (bug) =>
  apis.apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: slice.actions.bugAdded.type,
  });

const resolveBug = (id) =>
  apis.apiCallBegan({
    // /bugs
    // PATCH /bugs/:id
    url: url + "/" + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: slice.actions.bugResolved.type,
  });

const assignBugToUser = (bugId, userId) =>
  apis.apiCallBegan({
    url: url + "/" + bugId,
    method: "patch",
    data: { userId },
    onSuccess: slice.actions.bugAssignedToUser.type,
  });

// const loadBugs = () =>
//   apis.apiCallBegan({
//     url,
//     onStart: slice.actions.bugsRequested.type,
//     onSuccess: slice.actions.bugsReceived.type,
//     onError: slice.actions.bugsRequestFailed.type,
//   });

module.exports = {
  bugsReducer: slice.reducer,
  bugsActions: slice.actions,
  bugsSelectors: {
    getUnresolvedBugs,
    getBugsByUser,
  },
  loadBugs,
  addBug,
  resolveBug,
  assignBugToUser,
};
