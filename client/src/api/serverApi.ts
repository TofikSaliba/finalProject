import axios from "axios";
import { headerOptions } from "../types/types";

function serverAPI(options: headerOptions = {}) {
  const { headers = {} } = options;
  const URL =
    process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000";
  return axios.create({
    baseURL: URL,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}
export default serverAPI;
