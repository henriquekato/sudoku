import { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");

  const contextValue = {
    token,
    setToken,
    userName,
    setUserName,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
