import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "15bb57f3ba884c3dabfd98e4ab984b28",
  },
});
