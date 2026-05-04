"use client";
import { useContext } from "react";
import { AxiosContext } from "../Provider/AxiosProvider";

export const useAxios = () => {
  return useContext(AxiosContext);
};
