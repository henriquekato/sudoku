import styled from "styled-components";
import CloseButton from "./CloseButton";
import H2 from "../Headings/H2";
import { pinkColor, redColor } from "../../styles/colors";

const StyledModalHeader = styled.div`
  display: grid;
  grid-template-columns: 6fr 1fr;
  align-items: center;
  margin-bottom: 15px;
`;

function ModalHeader(props) {
  return (
    <StyledModalHeader>
      <H2>Escolha o tabuleiro</H2>
      <CloseButton
        onClick={props.closeModal}
        $bg={redColor}
        $hoverbg={pinkColor}
      >
        X
      </CloseButton>
    </StyledModalHeader>
  );
}

export default ModalHeader;
