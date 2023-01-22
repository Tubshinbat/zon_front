import axios from "axios";

const instance = axios.create({
  baseURL: "https://beta.metaldoor.mn/api/",
});

instance.defaults.withCredentials = true;

export default instance;
