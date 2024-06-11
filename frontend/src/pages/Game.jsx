import { useLocation } from "react-router-dom";
import Header from "../components/Headings/Header";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import Sudoku from "../components/Sudoku/Sudoku";
import Timer from "../components/Timer";
import styled from "styled-components";
import ButtonLink from "../components/Buttons/ButtonLink";
import Button from "../components/Buttons/Button";
import { pinkColor, redColor } from "../styles/colors";
import Messages from "../components/Messages/Messages";

const Container = styled.div``;

function Game() {
  const { state } = useLocation();
  const boardId = state.boardId;
  const inicialMatrix = state.matrix;

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");
  const [matrix, setMatrix] = useState(inicialMatrix);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const incrementTime = setInterval(() => {
      setSeconds(seconds + 1);
      if (seconds >= 59) {
        setSeconds(0);
        setMinutes(minutes + 1);
      }
    }, 1000);

    return () => clearInterval(incrementTime);
  }, [seconds]);

  function restartGame() {
    setMatrix(inicialMatrix);
    setSeconds(0);
    setMinutes(0);
  }

  return (
    <>
      <Nav />
      <Header>Jogo</Header>
      <Messages errors={errors} success={success} />
      <Container>
        <Sudoku
          setErrors={setErrors}
          setSuccess={setSuccess}
          setMatrix={setMatrix}
          matrix={matrix}
          boardId={boardId}
        />
        <div>
          <Timer minutes={minutes} seconds={seconds} />
          <Button $bg={redColor} $hoverbg={pinkColor} onClick={restartGame}>
            Restart
          </Button>
          <ButtonLink to={"/newgame"} $bg={redColor} $hoverbg={pinkColor}>
            Novo jogo aleatório
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}

export default Game;
