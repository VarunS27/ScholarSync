import React, { createContext, useState, useEffect } from 'react';
import { getUserFromLocalStorage, setUserInLocalStorage, removeUserFromLocalStorage } from '../utils/localStorage';
import { loginUser, logoutUser } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getUserFromLocalStorage());

  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (credentials) => {
    const loggedInUser = await loginUser(credentials);
    setUser(loggedInUser);
    setUserInLocalStorage(loggedInUser);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    removeUserFromLocalStorage();
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export default AuthContext;