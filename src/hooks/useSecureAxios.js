import axios from "axios";
import { useEffect } from "react";
import { logOut } from "../API/utilites";
import { useNavigate } from "react-router-dom";

const secureAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useSecureAxios = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // request
    secureAxios.interceptors.request.use(
      async (config) => {
        const token = localStorage.getItem("hunter_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // for responses
    secureAxios.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error.response) {
          const { status } = error.response;
          if (status === 401 || status === 403) {
            await logOut();
            navigate("/login");
          }
        }

        return Promise.reject(error);
      }
    );
  }, []);

  return { secureAxios };
};

export default useSecureAxios;
