import React from "react";
import Routes from "./Routes";
import { AuthProvider } from "./AuthProvider";

import GlobalStyle from "./styles/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
}

export default App;
