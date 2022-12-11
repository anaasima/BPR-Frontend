import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const authHeader = () => {
  return {
    headers: {
      "app-token": localStorage.getItem("app-token"),
    },
  };
};
