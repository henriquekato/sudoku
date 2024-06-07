import styled from "styled-components";
import { blueColor, whiteColor } from "../styles/colors";
import { StyledLink } from "../styles/GlobalStyle";

const StyledNav = styled.nav`
  text-align: center;
  display: flex;
  justify-content: space-between;
  background-color: ${blueColor};
  color: ${whiteColor};
  padding: 10px 15px;
  font-size: 24px;
`;

function Nav() {
  return (
    <StyledNav>
      <StyledLink to={`/`}>Home</StyledLink>
      <span>Logout</span>
    </StyledNav>
  );
}

export default Nav;
