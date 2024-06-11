import Nav from "../components/Nav";
import Header from "../components/Headings/Header";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { rankingUri } from "../apiEndpoints";
import RankingList from "../components/Ranking/RankingList";
import RankingItem from "../components/Ranking/RankingItem";
import styled from "styled-components";
import ButtonLink from "../components/Buttons/ButtonLink";
import { useParams } from "react-router-dom";

const PlayButtonLink = styled(ButtonLink)`
  padding: 10px;
  border: none;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
  font-size: 20px;
  margin: auto auto 20px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

function Ranking() {
  const { token } = useContext(AuthContext);
  const { boardId } = useParams();

  const [games, setGames] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${rankingUri}/${boardId}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setGames(data.ranking);
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
      <Header>Ranking do tabuleiro {boardId}</Header>
      <RankingList>
        {games.map((game, index) => (
          <RankingItem key={game.id}>
            <div>{index + 1}º</div>
            <div>{game.userName}</div>
            <div>Tempo: {formattedTime(game.completionTime)}</div>
          </RankingItem>
        ))}
      </RankingList>
      <Container>
        <PlayButtonLink to={`/newgame/${boardId}`}>
          Jogar tabuleiro {boardId}
        </PlayButtonLink>
      </Container>
    </>
  );
}

export default Ranking;
