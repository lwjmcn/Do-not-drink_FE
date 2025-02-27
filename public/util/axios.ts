import axios from "axios";
import { getCookie } from "./cookies";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// axios 요청 시 헤더에 accessToken을 추가
axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await getCookie("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosInstance;
