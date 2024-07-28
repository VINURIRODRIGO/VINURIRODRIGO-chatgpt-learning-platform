import { createContext } from "react";
/**
 * Context to manage authentication state and logic.
 */
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

export default AuthContext;
