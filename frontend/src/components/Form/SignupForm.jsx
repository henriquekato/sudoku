import { useState } from "react";
import { darkColor, whiteColor } from "../../styles/colors";
import { signupUri } from "../../apiEndpoints";
import FormDiv from "./FormDiv";
import Input from "./Input";
import Label from "./Label";
import FormField from "./FormField";
import H2 from "../Headings/H2";
import Button from "../Buttons/Button";

function SignupForm(props) {
  const inputNameId = "signup-name";
  const inputEmailId = "signup-email";
  const inputPasswordId = "signup-password";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    if (name == "name") {
      setName(value);
    } else if (name == "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const options = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      };
      const response = await fetch(signupUri, options);
      const data = await response.json();
      if (response.ok) {
        props.setSuccess(data.success);
        props.setErrors([]);
        setName("");
        setEmail("");
        setPassword("");
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
      <H2>Cadastro</H2>
      <FormDiv>
        <FormField>
          <Label htmlFor={inputNameId}>Nome:</Label>
          <Input
            type="text"
            name="name"
            placeholder="Nome"
            id={inputNameId}
            value={name}
            onChange={handleChange}
          />
        </FormField>
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
          $bordercolor={darkColor}
          $hoverbg={darkColor}
          $hovercolor={whiteColor}
          onClick={handleSubmit}
        >
          Cadastrar
        </Button>
      </FormDiv>
    </div>
  );
}

export default SignupForm;
