"use client";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

export const useAuth = () => {
    return useContext(AuthContext)
}