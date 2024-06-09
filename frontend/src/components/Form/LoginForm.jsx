import { useContext, useState } from "react";
import { darkColor, whiteColor } from "../../styles/colors";
import { loginUri } from "../../apiEndpoints";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import FormDiv from "./FormDiv";
import Input from "./Input";
import Label from "./Label";
import FormField from "./FormField";
import H2 from "../Headings/H2";
import { jwtDecode } from "jwt-decode";
import Button from "../Buttons/Button";

function LoginForm(props) {
  const { setToken, setUsername } = useContext(AuthContext);
  const navigate = useNavigate();

  const inputEmailId = "login-email";
  const inputPasswordId = "login-password";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const options = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      };
      const response = await fetch(loginUri, options);
      const data = await response.json();
      if (response.ok) {
        setEmail("");
        setPassword("");
        setToken(data.token);
        setUsername(jwtDecode(data.token).name);
        navigate("/");
      } else {
        props.setSuccess("");
        props.setErrors(data.errors);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <H2>Login</H2>
      <FormDiv>
        <FormField>
          <Label htmlFor={inputEmailId}>Email:</Label>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            id={inputEmailId}
            value={email}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <Label htmlFor={inputPasswordId}>Senha:</Label>
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            id={inputPasswordId}
            value={password}
            onChange={handleChange}
          />
        </FormField>
        <Button
          bordercolor={darkColor}
          hoverbg={darkColor}
          hovercolor={whiteColor}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </FormDiv>
    </div>
  );
}

export default LoginForm;
