const { createAction } = require("@reduxjs/toolkit");

const apiCallBegan = createAction("api/callBegan");
const apiCallSuccess = createAction("api/callSuccess");
const apiCallFailed = createAction("api/callFailed");

module.exports.apis = {
  apiCallBegan,
  apiCallSuccess,
  apiCallFailed,
};
