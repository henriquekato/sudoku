import styled from "styled-components";
import Button from "../Buttons/Button";
import { useState } from "react";
import { darkColor } from "../../styles/colors";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
  border-radius: 0 0 5px 5px;

  @media (min-width: 480px) {
    position: absolute;
  }

  :nth-child(1) {
    border-bottom: 1px solid ${darkColor};
    border-radius: 5px 5px 0 0;
  }

  :nth-child(2) {
    margin-top: -5px;
  }
`;

const StyledDropdown = styled.div`
  max-width: 130px;
  position: relative;
  margin-bottom: ${(props) => (props.$isOpen ? "10px" : "0")};

  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
  }
`;

function GameSelectionDropdown(props) {
  const [isOpen, setOpen] = useState(false);

  function toggleDropdown() {
    setOpen(!isOpen);
  }

  return (
    <StyledDropdown $isOpen={isOpen}>
      <Button onClick={toggleDropdown} $border>
        {props.text} ⯆
      </Button>
      {isOpen && <Container>{props.children}</Container>}
    </StyledDropdown>
  );
}

export default GameSelectionDropdown;
