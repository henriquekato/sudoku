import { useParams } from "react-router-dom";
import { newGameUri } from "../apiEndpoints";
import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

function Game() {
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);
  const { boardId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        let gameUri = newGameUri;
        if (boardId) {
          gameUri = `${gameUri}/${boardId}`;
        }
        const response = await fetch(gameUri, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          navigate(`/game`, {
            state: { matrix: data.matrix, boardId: data.id },
          });
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
}

export default Game;
