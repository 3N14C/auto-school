import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://drive-leader.vercel.app/api"
      : "http://localhost:3200/api",
})
