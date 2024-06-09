import styled from "styled-components";
import { blueColor, whiteColor } from "../styles/colors";
import { Link } from "react-router-dom";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: ${blueColor};
  color: ${whiteColor};
  padding: 10px 15px;
  font-size: 24px;
  font-weight: 700;
`;

const StyledLink = styled(Link)`
  color: ${(props) => props.color || whiteColor};
`;

function Nav(props) {
  return (
    <StyledNav>
      {!props.children && <StyledLink to={`/`}>Home</StyledLink>}
      {props.children && props.children}
      {!props.children && <StyledLink to={"/logout"}>Logout</StyledLink>}
    </StyledNav>
  );
}

export default Nav;
