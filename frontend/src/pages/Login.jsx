import H1 from "../components/Headings/H1";
import SignupForm from "../components/Form/SignupForm";
import LoginForm from "../components/Form/LoginForm";
import Nav from "../components/Nav";
import styled from "styled-components";
import { useState } from "react";
import BannerMessage from "../components/BannerMessage";

const FormContainer = styled.div`
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
  align-items: center;
  margin-bottom: 30px;
`;

function Login() {
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");

  return (
    <>
      <Nav>Sudoku</Nav>
      <Header>
        <H1>Sudoku</H1>
        {success && <BannerMessage $success>{success}</BannerMessage>}
        {errors.length > 0 && (
          <BannerMessage>
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </BannerMessage>
        )}
      </Header>
      <FormContainer>
        <SignupForm setSuccess={setSuccess} setErrors={setErrors} />
        <LoginForm setSuccess={setSuccess} setErrors={setErrors} />
      </FormContainer>
    </>
  );
}

export default Login;
