import axios from "axios";
import { toast } from "react-toastify";

// Protected API Ends
// args
// 1. success
// 2. fail
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // console.log("Logging the error: ", error);
    console.log(error);
    toast("An unexpected error occurred");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

export default http;
