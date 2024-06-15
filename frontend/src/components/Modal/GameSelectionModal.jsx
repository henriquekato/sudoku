import { styled } from "styled-components";
import ButtonLink from "../Buttons/ButtonLink";
import { blueColor, lightBlueColor, whiteColor } from "../../styles/colors";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { allBoardsUri } from "../../apiEndpoints";
import ModalHeader from "./ModalHeader";
import ModalBackdrop from "./ModalBackdrop";
import ModalContent from "./ModalContent";

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
        <ModalHeader closeModal={props.closeModal} />
        <OptionContainer>
          {boards.map((board) => (
            <Option
              key={board}
              $color={whiteColor}
              $bg={blueColor}
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
