// Action + ActionType
const { createAction } = require("@reduxjs/toolkit");
// Action + ActionType - type, payload
const bugAdded = createAction("bugAdded");
let result = bugAdded({ id: 1 });
console.log(result.type);
console.log(result.payload);
