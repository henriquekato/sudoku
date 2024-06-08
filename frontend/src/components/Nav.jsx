import styled from "styled-components";
import { blueColor, whiteColor } from "../styles/colors";
import { StyledLink } from "../styles/GlobalStyle";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-around;
  background-color: ${blueColor};
  color: ${whiteColor};
  padding: 10px 15px;
  font-size: 24px;
  font-weight: 700;
`;

function Nav(props) {
  return (
    <StyledNav>
      {!props.children && <StyledLink to={`/`}>Home</StyledLink>}
      {props.children && props.children}
      {!props.children && <span>Logout</span>}
    </StyledNav>
  );
}

export default Nav;
