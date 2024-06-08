import { useContext, useState } from "react";
import { Button } from "../../styles/GlobalStyle";
import { darkColor, whiteColor } from "../../styles/colors";
import { loginUri } from "../../apiEndpoints";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import { Form, Input, Label, FormField, H2 } from "./styled";

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
        props.setSuccess(data.success);
        props.setErrors([]);
        setEmail("");
        setPassword("");
        setToken(data.token);
        setUsername(data.name);
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
      <Form>
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
      </Form>
    </div>
  );
}

export default LoginForm;
