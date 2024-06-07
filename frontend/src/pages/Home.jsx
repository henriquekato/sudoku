import { useState } from "react";
import Nav from "../components/Nav";
import GameSelectionModal from "../components/GameSelectionModal";
import { H1, ButtonContainer, ButtonLink, Button } from "../styles/GlobalStyle";

function Home() {
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
      <H1>Olá</H1>
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
