import styled from "styled-components";

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  max-width: 400px;
  font-size: 18px;
  padding: 5px;
  border: 0.1rem solid rgba(0, 0, 0, 0.5);
  border-radius: 5px;
`;

export const Label = styled.label`
  display: block;
  font-size: 18px;
  cursor: pointer;
`;

export const FormField = styled.div`
  margin: auto 15px 20px;
  min-width: 300px;
  display: grid;
  row-gap: 5px;
`;

export const H2 = styled.h2`
  text-align: center;
  margin-bottom: 15px;
`;
