import styled from "styled-components";
import { darkColor, lightBlueColor, whiteColor } from "../../styles/colors";
import { Link } from "react-router-dom";

const ButtonLink = styled(Link)`
  display: inline-block;
  text-align: center;
  padding: 12px 20px;
  margin: 5px;
  background-color: ${(props) => props.$bg || whiteColor};
  color: ${(props) => props.$color || darkColor};
  border: ${(props) =>
    props.$border
      ? "3px solid " + (props.$bordercolor || lightBlueColor)
      : "none"};
  text-align: center;
  border-radius: 5px;
  &:hover {
    background-color: ${(props) => props.$hoverbg || lightBlueColor};
    color: ${(props) => props.$hovercolor || darkColor};
  }
`;

export default ButtonLink;
