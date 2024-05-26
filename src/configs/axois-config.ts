import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3200/api",
});
