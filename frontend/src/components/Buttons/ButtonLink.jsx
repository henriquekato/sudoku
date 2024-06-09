import styled from "styled-components";
import { darkColor, lightBlueColor, whiteColor } from "../../styles/colors";
import { Link } from "react-router-dom";

const ButtonLink = styled(Link)`
  display: inline-block;
  text-align: center;
  padding: 12px 20px;
  margin: 5px;
  font-size: 20px;
  min-width: 140px;
  background-color: ${whiteColor};
  color: ${darkColor};
  border: 3px solid ${lightBlueColor};
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  &:hover {
    background-color: ${lightBlueColor};
  }
`;

export default ButtonLink;
