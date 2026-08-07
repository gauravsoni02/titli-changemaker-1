import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const TOKEN_KEY = "titli_coordinator_token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [coordinator, setCoordinator] = useState(null); // null=loading, false=anon, obj=user
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || null);

  const apply = useCallback((tok) => {
    if (tok) {
      localStorage.setItem(TOKEN_KEY, tok);
      axios.defaults.headers.common["Authorization"] = `Bearer ${tok}`;
    } else {
      localStorage.removeItem(TOKEN_KEY);
      delete axios.defaults.headers.common["Authorization"];
    }
    setToken(tok);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!token) { setCoordinator(false); return; }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const { data } = await axios.get(`${API}/auth/coordinator/me`);
        if (!cancelled) setCoordinator(data);
      } catch {
        if (!cancelled) { apply(null); setCoordinator(false); }
      }
    })();
    return () => { cancelled = true; };
  }, [token, apply]);

  const login = async (email, password) => {
    const { data } = await axios.post(`${API}/auth/coordinator/login`, { email, password });
    apply(data.access_token);
    setCoordinator(data.coordinator);
    return data.coordinator;
  };

  const logout = () => {
    apply(null);
    setCoordinator(false);
  };

  const setSession = (tok, coord) => {
    apply(tok);
    setCoordinator(coord);
  };

  return (
    <AuthContext.Provider value={{ coordinator, login, logout, setSession, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export function formatApiErrorDetail(detail) {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e))).filter(Boolean).join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}
