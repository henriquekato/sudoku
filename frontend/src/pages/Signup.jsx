import Header from "../components/Headings/Header";
import SignupForm from "../components/Form/SignupForm";
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

function Signup() {
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");

  return (
    <>
      <Nav>Sudoku</Nav>
      <Header>Sudoku</Header>
      <Messages errors={errors} success={success} />
      <Container>
        <SignupForm setSuccess={setSuccess} setErrors={setErrors} />
        <SwitchPageLink to={"/login"}>Fazer login</SwitchPageLink>
      </Container>
    </>
  );
}

export default Signup;
