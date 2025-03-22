import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Signin from "../pages/Signin";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useSelector((state) => state.user);
  if (!currentUser) {
    return <Signin />;
  }
  return children;
}
