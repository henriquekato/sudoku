import Header from "../components/Headings/Header";
import LoginForm from "../components/Form/LoginForm";
import Nav from "../components/Nav";
import styled from "styled-components";
import { useState } from "react";
import Messages from "../components/Messages/Messages";
import SwitchPageLink from "../components/Form/SwitchPageLink";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function Login() {
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");

  return (
    <>
      <Nav>Sudoku</Nav>
      <Header>Sudoku</Header>
      <Messages errors={errors} success={success} />
      <Container>
        <LoginForm setSuccess={setSuccess} setErrors={setErrors} />
        <SwitchPageLink to={"/signup"}>Se cadastrar</SwitchPageLink>
      </Container>
    </>
  );
}

export default Login;
