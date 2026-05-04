"use client";

//import { useAuth } from "../(protectedAdmin)/AuthContext";
import { useAuth } from "../Hook/useAuth";
import axios from "axios";
import { createContext, useMemo } from "react";
//import LogOutUser from "../(nabanna-IT)/component/LogOutUser";

export const AxiosContext = createContext(null);

export default function AxiosProvider({ children }) {
  const { authSessionId } = useAuth();
  const BASE_URL = "/api";
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      withCredentials: true,
    });
    // REQUEST INTERCEPTOR
    instance.interceptors.request.use((config) => {
      //console.log("Interceptor Running");
      if (authSessionId) {
        config.headers.Authorization = `Bearer ${authSessionId}`;
        //config.headers.Authorization = `Bearer 04c61c5b-f7c5-419f-a2ea-e5e3897cd95b`; // to check erro sending false id //
        //console.log("TOKEN ATTACHED:", authSessionId);
      }
      return config;
    });
    // RESPONSE INTERCEPTOR (ERROR HANDLING)
    instance.interceptors.response.use(
      (response) => response,

      (error) => {
        const status = error.response?.status;

        if (status === 401) {
          console.log("Session expired / Unauthorized");

          // optional: clear auth state
          //LogOutUser?.();

          // redirect login (if gets error)
          //window.location.href = "/admin";
        }

        if (status === 403) {
          console.log("Forbidden Access");
        }

        return Promise.reject(error);
      },
    );
    return instance;
  }, [authSessionId]);

  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
}
