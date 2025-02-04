import React from "react";
import { Route, Navigate } from "react-router-dom";
import isLogin from "../utils/isLogin";

const PrivateRoute = ({ children }) => {
  const authed = isLogin();
  return authed ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
