import { H1, BannerMessage } from "../styles/GlobalStyle";
import Form from "../components/Form";
import Nav from "../components/Nav";
import styled from "styled-components";
import { loginUri, signupUri } from "../apiEndpoints";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function Login() {
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");

  return (
    <>
      <Nav>Sudoku</Nav>
      <Header>
        <H1>Bem vindo</H1>
        {success && (
          <BannerMessage success={success.toString()}>{messages}</BannerMessage>
        )}
        {errors.length > 0 && (
          <BannerMessage>
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </BannerMessage>
        )}
      </Header>
      <Container>
        <Form
          uri={signupUri}
          id="signup"
          title="Cadastro"
          name={true}
          email={true}
          password={true}
          button="Cadastrar"
          setSuccess={setSuccess}
          setErrors={setErrors}
        />
        <Form
          uri={loginUri}
          id="login"
          title="Login"
          email={true}
          password={true}
          button="Login"
          setSuccess={setSuccess}
          setErrors={setErrors}
        />
      </Container>
    </>
  );
}

export default Login;
