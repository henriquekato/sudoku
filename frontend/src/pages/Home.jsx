import { useContext, useState } from "react";
import Nav from "../components/Nav";
import GameSelectionModal from "../components/GameSelectionModal";
import ButtonLink from "../components/Buttons/ButtonLink";
import Button from "../components/Buttons/Button";
import H1 from "../components/Headings/H1";
import { AuthContext } from "../AuthProvider";
import styled from "styled-components";

const ButtonContainer = styled.nav`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 30px auto;
  flex-wrap: wrap;
  align-content: center;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

function Home() {
  const { username } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  function openModal(modalText) {
    setModalText(modalText);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Nav />
      <H1>Olá {username}</H1>
      <ButtonContainer>
        <ButtonLink to={`/profile`}>Meus jogos</ButtonLink>
        <Button
          onClick={() => {
            openModal("Jogar");
          }}
          modaltext="Jogar"
        >
          Jogar
        </Button>
        <Button
          onClick={() => {
            openModal("Ranking");
          }}
          modaltext="Ranking"
        >
          Ranking
        </Button>
      </ButtonContainer>

      <GameSelectionModal
        isOpen={isOpen}
        closeModal={closeModal}
        modalText={modalText}
      />
    </>
  );
}

export default Home;
