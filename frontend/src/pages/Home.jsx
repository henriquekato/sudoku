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

const HomeButtonLink = styled(ButtonLink)`
  font-size: 20px;
  min-width: 140px;
`;

function Home() {
  const { username } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [route, setRoute] = useState("");

  function openModal(modalRoute) {
    setRoute(modalRoute);
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
        <HomeButtonLink to={`/profile`}>Meus jogos</HomeButtonLink>
        <Button
          onClick={() => {
            openModal("game");
          }}
        >
          Jogar
        </Button>
        <Button
          onClick={() => {
            openModal("ranking");
          }}
        >
          Ranking
        </Button>
      </ButtonContainer>
      {isOpen && <GameSelectionModal
        closeModal={closeModal}
        route={route}
      />}
    </>
  );
}

export default Home;
