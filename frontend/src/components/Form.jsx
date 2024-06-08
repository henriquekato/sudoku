import styled from "styled-components";
import { useContext, useState } from "react";
import { Button } from "../styles/GlobalStyle";
import { darkColor, greenColor, redColor, whiteColor } from "../styles/colors";
import { signupUri } from "../apiEndpoints";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  max-width: 400px;
  font-size: 18px;
  padding: 5px;
  border: 0.1rem solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;
`;

const Label = styled.label`
  display: block;
  font-size: 18px;
  cursor: pointer;
`;

const FormField = styled.div`
  margin: auto 15px 20px;
  min-width: 300px;
  display: grid;
  row-gap: 5px;
`;

const H2 = styled.h2`
  text-align: center;
  margin-bottom: 15px;
`;

function FormComponent(props) {
  const { setToken, setUsername } = useContext(AuthContext);
  const navigate = useNavigate();

  const inputNameId = props.id + "-name";
  const inputEmailId = props.id + "-email";
  const inputPasswordId = props.id + "-password";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    if (name == "name") {
      setName(value);
    } else if (name == "email") {
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
        body: JSON.stringify({ name, email, password }),
      };
      const response = await fetch(signupUri, options);
      const data = await response.json();
      if (response.ok) {
        props.setSuccess(data.success);
        props.setErrors([]);
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
      <H2>{props.title}</H2>
      <StyledForm>
        {props.name && (
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
        )}
        {props.email && (
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
        )}
        {props.password && (
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
        )}
        <Button
          bordercolor={darkColor}
          hoverbg={darkColor}
          hovercolor={whiteColor}
          onClick={handleSubmit}
        >
          {props.button}
        </Button>
      </StyledForm>
    </div>
  );
}

export default FormComponent;
