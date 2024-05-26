import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://drive-leader.vercel.app/api",
});
