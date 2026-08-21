/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../api/authApi";

export const AuthContext = createContext(null);

const TOKEN_KEY = "saviours-auth-token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() =>
    localStorage.getItem(TOKEN_KEY)
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser(token);

        setUser(response.user);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, [token]);

  const register = async (userData) => {
    const response = await registerUser(userData);

    localStorage.setItem(
      TOKEN_KEY,
      response.token
    );

    setToken(response.token);
    setUser(response.user);

    return response;
  };

  const login = async (credentials) => {
    const response = await loginUser(credentials);

    localStorage.setItem(
      TOKEN_KEY,
      response.token
    );

    setToken(response.token);
    setUser(response.user);

    return response;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);

    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(user && token),
      register,
      login,
      logout,
    }),
    [user, token, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}