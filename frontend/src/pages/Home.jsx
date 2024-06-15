import { useContext, useState } from "react";
import Nav from "../components/Nav";
import GameSelectionModal from "../components/Modal/GameSelectionModal";
import ButtonLink from "../components/Buttons/ButtonLink";
import Button from "../components/Buttons/Button";
import Header from "../components/Headings/Header";
import { AuthContext } from "../AuthProvider";
import styled from "styled-components";
import GameSelectionDropdown from "../components/Dropdown/GameSelectionDropdown";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 45px auto;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
  }
`;

const HomeButtonLink = styled(ButtonLink)`
  font-size: 20px;
  max-width: 150px;
`;

const HomeButton = styled(Button)`
  max-width: 150px;
`;

const DropdownButton = styled(Button)`
  font-size: 18px;
`;

const DropdownButtonLink = styled(ButtonLink)`
  font-size: 18px;
`;

const Paragraph = styled.p`
  font-size: 30px;
  margin: auto 10px;
  text-align: center;
`;

function Home() {
  const { userName } = useContext(AuthContext);

  const [isOpen, setOpen] = useState(false);
  const [route, setRoute] = useState("");

  function openModal(modalRoute) {
    setRoute(modalRoute);
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      <Nav />
      <Header>Sudoku</Header>
      <Paragraph>Olá, {userName}</Paragraph>
      <ButtonContainer>
        <HomeButtonLink to={`/profile`} $border>
          Meus jogos
        </HomeButtonLink>
        <GameSelectionDropdown text="Jogar">
          <DropdownButtonLink to={"/game"} $hoverbg={"rgba(0, 0, 0, 0.2)"}>
            Aleatório
          </DropdownButtonLink>
          <DropdownButton
            $hoverbg={"rgba(0, 0, 0, 0.2)"}
            onClick={() => {
              openModal("game");
            }}
          >
            Escolher tabuleiro
          </DropdownButton>
        </GameSelectionDropdown>
        <HomeButton
          $border
          onClick={() => {
            openModal("ranking");
          }}
        >
          Ranking
        </HomeButton>
      </ButtonContainer>
      {isOpen && <GameSelectionModal closeModal={closeModal} route={route} />}
    </>
  );
}

export default Home;
