const axios = require("axios");
const { apis } = require("../api");

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    console.log("Action.Type: ", action.type);
    if (action.type !== "api/callBegan") return next(action); // We don't want the rest of the code to be executed

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    // onStart에 bugs/bugsRequested가 있으니까 최초 호출
    if (onStart) dispatch({ type: onStart });
    // console.log(next(action));
    next(action);

    try {
      const response = await axios.request({
        baseURL: "http://localhost:9001/api",
        url,
        method,
        data,
      });

      // console.log("데이터: ", response.data);

      // General
      dispatch(apis.apiCallSuccess(response.data));
      // Specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      // General
      dispatch(apis.apiCallFailed(error.message));
      // Specific
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

module.exports = api;
