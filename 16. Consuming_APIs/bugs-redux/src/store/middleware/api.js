const axios = require("axios");
const { apis } = require("../api");

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    console.log("----------------------------------------------------------");
    // console.log("api-next: ", next);
    console.log("미들웨어 API: ", action);

    if (action.type !== "api/callBegan") return next(action);

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });
    next(action);

    try {
      const response = await axios.request({
        baseURL: "http://localhost:9001/api",
        url,
        method,
        data,
      });

      console.log("Response: ", response.data);

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
