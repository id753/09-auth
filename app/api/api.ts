import axios from "axios";

export const api = axios.create({
  baseURL: "https://nodejs-hw-jx7n.onrender.com",
  withCredentials: true,
});
