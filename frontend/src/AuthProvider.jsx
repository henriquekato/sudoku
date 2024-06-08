import { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");

  const contextValue = {
    token,
    setToken,
    username,
    setUsername,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
