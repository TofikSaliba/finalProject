import axios from "axios";

interface headerOptions {
  headers?: {
    Authorization?: string;
  };
}

function userApi(options: headerOptions = {}) {
  const { headers = {} } = options;
  const URL =
    process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/users";
  return axios.create({
    baseURL: URL,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}
export default userApi;
