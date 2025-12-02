import { createContext, useContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = AuthContext.Provider;

export const useAuth = () => {
  return useContext(AuthContext);
};
