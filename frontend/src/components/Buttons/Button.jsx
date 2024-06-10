import styled from "styled-components";
import { darkColor, lightBlueColor, whiteColor } from "../../styles/colors";

const Button = styled.button`
  color: ${(props) => props.$color || darkColor};
  background-color: ${(props) => props.$bg || whiteColor};
  font-size: 20px;
  padding: 12px 20px;
  text-align: center;
  border: ${(props) =>
    props.$border
      ? "3px solid " + (props.$bordercolor || lightBlueColor)
      : "none"};
  border-radius: 3px;
  margin: 5px;
  &:hover {
    background-color: ${(props) => props.$hoverbg || lightBlueColor};
    color: ${(props) => props.$hovercolor || darkColor};
  }
`;

export default Button;
