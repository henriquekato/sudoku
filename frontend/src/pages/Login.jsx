import Header from "../components/Headings/Header";
import SignupForm from "../components/Form/SignupForm";
import LoginForm from "../components/Form/LoginForm";
import Nav from "../components/Nav";
import styled from "styled-components";
import { useState } from "react";
import Messages from "../components/Messages/Messages";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

function Login() {
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");

  return (
    <>
      <Nav>Sudoku</Nav>
      <Header>Sudoku</Header>
      <Messages errors={errors} success={success} />
      <FormContainer>
        <SignupForm setSuccess={setSuccess} setErrors={setErrors} />
        <LoginForm setSuccess={setSuccess} setErrors={setErrors} />
      </FormContainer>
    </>
  );
}

export default Login;
