"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null)

export const AuthProvider = ({ children, authInfo }) => {
  const { username, rank, s_id } = authInfo;
  const [authSessionId, setauthSessionId] = useState(s_id);
  const [authName, setAuthName] = useState(username);
  const [authRank, setAuthRank] = useState(rank);

 
  const authContextValue = {authSessionId,authName,authRank};
  return (
    <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
  );
};