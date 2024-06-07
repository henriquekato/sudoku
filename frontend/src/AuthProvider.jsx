import { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");

  const contextValue = {
    token,
    setToken,
    name,
    setName,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
