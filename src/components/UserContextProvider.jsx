import React, { createContext, useContext, useEffect, useState } from "react";
import Loader from "./Loader";

export const UserContext = createContext(null);

export const useUser  = () => {
  return useContext(UserContext);
};

const UserContextProvider = ({ children }) => {
  const [user, setUser ] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      fetch(`http://localhost:5002/users?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setUser (data[0]);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    setUser (null);
    localStorage.removeItem("userId");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <UserContext.Provider value={{ user, setUser , loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;