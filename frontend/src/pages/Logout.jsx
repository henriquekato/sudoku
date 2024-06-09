import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const { setToken, setUserName } = useContext(AuthContext);

  useEffect(() => {
    setToken();
    setUserName();

    navigate("/login");
  }, []);
}

export default Logout;
