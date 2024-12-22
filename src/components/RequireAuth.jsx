import React from "react";
import { Navigate } from "react-router-dom";
import { useUser  } from "./UserContextProvider";
import Loader from "./Loader";

const RequireAuth = ({ children }) => {
  const { user, loading } = useUser ();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;