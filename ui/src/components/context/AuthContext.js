import React, { useEffect, useState, createContext, useContext } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(JSON.parse(storedUser));
  }, []);

  const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  };

  const userIsAuthenticated = () => {
    let user = localStorage.getItem('user');
    if (!user) {
      return false;
    }
    user = JSON.parse(user);

    if (Date.now() > user.data.exp * 1000) {
      userLogout();
      return false;
    }
    return true;
  };

  const userLogin = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const userLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
      <AuthContext.Provider
          value={{
            user,
            getUser,
            userIsAuthenticated,
            userLogin,
            userLogout,
          }}
      >
        {children}
      </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
