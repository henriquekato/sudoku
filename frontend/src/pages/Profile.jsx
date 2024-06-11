import Nav from "../components/Nav";
import Header from "../components/Headings/Header";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { profileUri } from "../apiEndpoints";
import RankingItem from "../components/Ranking/RankingItem";
import RankingList from "../components/Ranking/RankingList";
import ButtonLink from "../components/Buttons/ButtonLink";
import styled from "styled-components";

const PlayAgainButtonLink = styled(ButtonLink)`
  padding: 5px;
  border: none;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ProfileList = styled(RankingList)`
  max-width: 500px;

  @media (min-width: 768px) {
    max-width: 670px;
  }
`;

const ProfileGame = styled(RankingItem)`
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

function Profile() {
  const { token } = useContext(AuthContext);

  const [games, setGames] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(profileUri, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setGames(data.games);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  function formattedTime(time) {
    return time.substring(3);
  }

  return (
    <>
      <Nav />
      <Header>Seus jogos</Header>
      <ProfileList>
        {games.map((game, index) => (
          <ProfileGame key={game.id}>
            <div>Jogo {index + 1}</div>
            <div>Tabuleiro {game.boardId}</div>
            <div>Tempo: {formattedTime(game.completionTime)}</div>
            <PlayAgainButtonLink to={`/newgame/${game.boardId}`}>
              Jogar novamente
            </PlayAgainButtonLink>
          </ProfileGame>
        ))}
      </ProfileList>
    </>
  );
}

export default Profile;
