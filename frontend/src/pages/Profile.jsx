import Nav from "../components/Nav";
import H1 from "../components/Headings/H1";
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

  return (
    <>
      <Nav />
      <H1>Seus jogos</H1>
      <RankingList>
        {games.map((game, index) => (
          <RankingItem key={game.id}>
            <div>Jogo {index + 1}</div>
            <div>Tabuleiro {game.boardId}</div>
            <div>Tempo {game.completionTime}</div>
            <PlayAgainButtonLink hoverbg={"rgba(0, 0, 0, 0.1)"}>
              Jogar novamente
            </PlayAgainButtonLink>
          </RankingItem>
        ))}
      </RankingList>
    </>
  );
}

export default Profile;
