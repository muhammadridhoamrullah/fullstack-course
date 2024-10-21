import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  //   baseURL: "https://api.p2.lc3s6.foxhub.space",
});

export default instance;
