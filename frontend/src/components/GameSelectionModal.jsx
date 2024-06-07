import { styled } from "styled-components";
import { Button } from "../styles/GlobalStyle";
import { pinkColor, redColor } from "../styles/colors";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  flex: 1 0 300px;
  margin: auto 10px;
  position: relative;
  max-width: 400px;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 4px;
  width: 40px;
  height: 40px;
`;

const H2 = styled.h2`
  text-align: center;
`;

export default function GameSelectionModal(props) {
  if (!props.isOpen) return;
  return (
    <ModalBackdrop onClick={props.closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton
          onClick={props.closeModal}
          bg={redColor}
          bordercolor={redColor}
          hovercolor={pinkColor}
        >
          X
        </CloseButton>
        <H2>{props.modalText}</H2>
      </ModalContent>
    </ModalBackdrop>
  );
}
