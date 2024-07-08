import { createContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
 
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState("");

  function login(token) {
    if (token) {
      setToken(token);
      setIsAuth(true);
    }
  }

  function logout() {
    setIsAuth(false);
    setToken("");
  }

  return (
    <authContext.Provider value={{ login, logout, isAuth }}>
      {children}
    </authContext.Provider>
  );
}
