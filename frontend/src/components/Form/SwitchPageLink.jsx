import styled from "styled-components";
import ButtonLink from "../Buttons/ButtonLink";
import { blueColor, darkColor, whiteColor } from "../../styles/colors";

const SwitchPageLink = styled(ButtonLink)`
  text-decoration: underline ${darkColor};
  padding: 0;
  margin-top: 20px;

  &:hover {
    background-color: ${whiteColor};
    color: ${blueColor};
    text-decoration: underline ${blueColor};
  }
`;

export default SwitchPageLink;
