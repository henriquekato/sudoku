import { styled } from "styled-components";
import ButtonLink from "./Buttons/ButtonLink";
import Button from "./Buttons/Button";
import {
  blueColor,
  lightBlueColor,
  pinkColor,
  redColor,
  whiteColor,
} from "../styles/colors";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { allBoardsUri } from "../apiEndpoints";
import H2 from "./Headings/H2";

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

const OptionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
`;

const Option = styled(ButtonLink)`
  padding: 5px 12px;
  font-size: 24px;
  margin: 10px;
`;

function GameSelectionModal(props) {
  const { token } = useContext(AuthContext);

  const [boards, setBoards] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(allBoardsUri, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setBoards(data.boardIds);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <ModalBackdrop onClick={props.closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton
          onClick={props.closeModal}
          $bg={redColor}
          $bordercolor={redColor}
          $hoverbg={pinkColor}
        >
          X
        </CloseButton>
        <H2>Escolha o tabuleiro</H2>
        <OptionContainer>
          {boards.map((board) => (
            <Option
              key={board}
              color={whiteColor}
              $bg={blueColor}
              $bordercolor={blueColor}
              $hoverbg={lightBlueColor}
              to={`/${props.route}/${board}`}
              state={{ boardId: board }}
            >
              {board}
            </Option>
          ))}
        </OptionContainer>
      </ModalContent>
    </ModalBackdrop>
  );
}

export default GameSelectionModal;
