// // Action Types
// const BUG_ADDED = "bugAdded";
// const BUG_REMOVED = "bugRemoved";
// const BUG_RESOLVED = "bugResolved";

// // Actions
// const bugAdded = (description) => ({
//   type: BUG_ADDED,
//   payload: {
//     description,
//   },
// });

// const bugRemoved = (id) => ({
//   type: BUG_REMOVED,
//   payload: {
//     id,
//   },
// });

// const bugResolved = (id) => ({
//   type: BUG_RESOLVED,
//   payload: {
//     id,
//   },
// });

const { createAction } = require("@reduxjs/toolkit");

// Action + ActionType
// type + payload
const bugUpdated = createAction("bugUpdated");
console.log(bugUpdated());
// { type: "bugUpdated", payload: undefined }
console.log(bugUpdated(1));
// { type: "bugUpdated", payload: 1 }
console.log(bugUpdated({ id: 1 }));
// { type: "bugUpdated", payload: { id: 1 } }
console.log(bugUpdated.type); // bugUpdated
console.log(bugUpdated.toString()); // bugUpdated
