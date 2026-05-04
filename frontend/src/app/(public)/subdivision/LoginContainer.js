import React from "react";
import ITLogin from "./LoginFormSubdivision/ITLogin";
import ITLoginWriters from "./LoginFormSubdivision/ITLoginWriters";
import ITLoginAlipore from "./LoginFormSubdivision/ITLoginAlipore";

const loginComponentMap = {
  nabanna: ITLogin,
  writers: ITLoginWriters,
  alipore: ITLoginAlipore,
};

const LoginContainer = ({ subdivision }) => {
  const LoginComponent = loginComponentMap[subdivision];
  if (!LoginComponent) {
    return <div>Invalid Subdivision</div>;
  }
  return <LoginComponent />;
};

export default LoginContainer;
