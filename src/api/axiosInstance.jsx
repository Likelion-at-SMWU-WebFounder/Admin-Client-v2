import axios from "axios";
import { getCookie, setCookie, removeCookie } from "./cookie";

const baseUrl = process.env.REACT_APP_HOST;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const statusCode = error.response?.status;
    if (statusCode == 401 || statusCode === 403) {
      try {
        const refreshToken = getCookie("refreshToken");
        if (!refreshToken) {
          removeCookie("accessToken");
          return Promise.reject(error);
        }
        const refreshResponse = await axios.post(
          `${process.env.REACT_APP_HOST}/api/admin/reissue`,
          null,
          {
            params: {
              accountId: "1",
              token: refreshToken,
            },
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const newAccessToken = refreshResponse.data.result.accessToken;
        setCookie("accessToken", newAccessToken, {
          path: "/",
        });
        setCookie("refreshToken", refreshResponse.data.result.refreshToken, {
          path: "/",
        });

        error.config.headers.Authorization = `Bearer ${newAccessToken}`;

        return axios(error.config);
      } catch (err) {
        removeCookie("accessToken");
        removeCookie("refreshToken");
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
