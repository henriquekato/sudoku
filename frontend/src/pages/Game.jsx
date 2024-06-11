import { useLocation } from "react-router-dom";
import Header from "../components/Headings/Header";
import Nav from "../components/Nav";
import { useContext, useEffect, useState } from "react";
import Sudoku from "../components/Sudoku/Sudoku";
import Timer from "../components/Timer";
import styled from "styled-components";
import ButtonLink from "../components/Buttons/ButtonLink";
import Button from "../components/Buttons/Button";
import { pinkColor, redColor } from "../styles/colors";
import Messages from "../components/Messages/Messages";
import { validateGameUri } from "../apiEndpoints";
import { AuthContext } from "../AuthProvider";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    justify-content: space-evenly;
    flex-direction: row;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
`;

const RestartButton = styled(Button)`
  font-size: 18px;
`;

const NewGameLink = styled(ButtonLink)`
  font-size: 18px;
`;

function Game() {
  const { token } = useContext(AuthContext);
  const { state } = useLocation();
  const boardId = state.boardId;
  const inicialMatrix = state.matrix;

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");
  const [matrix, setMatrix] = useState(inicialMatrix);
  const [modifiable, setModifiable] = useState();
  const [restarted, setRestarted] = useState(0);
  const [haveTime, setHaveTime] = useState(true);
  const [isPaused, setPaused] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  //timer
  useEffect(() => {
    const incrementTime = setInterval(() => {
      if (!haveTime || isPaused) {
        return;
      }
      setSeconds(seconds + 1);
      if (seconds >= 59) {
        setSeconds(0);
        setMinutes(minutes + 1);
      }
      if (minutes == 59 && seconds == 59) {
        setTime(!haveTime);
        setErrors(["Você não cumpriu o jogo em 1 hora, tente recomeçar."]);
      }
    }, 1000);

    return () => clearInterval(incrementTime);
  }, [seconds, haveTime, isPaused]);

  //set modifiable fields
  useEffect(() => {
    const aux = [];
    inicialMatrix.forEach((row) => {
      const mRow = [];
      row.forEach((number) => {
        if (number == 0) {
          mRow.push(true);
        } else {
          mRow.push(false);
        }
      });
      aux.push(mRow);
    });
    setModifiable(aux);
  }, [restarted]);

  //check if is completed
  useEffect(() => {
    let completed = true;
    matrix.forEach((row) => {
      row.forEach((number) => {
        if (!number) {
          completed = false;
          return;
        }
      });
    });
    if (!completed) return;
    setPaused(true);

    const abortController = new AbortController();

    (async () => {
      try {
        const response = await fetch(validateGameUri, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            boardId,
            matrix,
            completionTime: `00:${minutes}:${seconds}`,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setSuccess(data.success);
          setErrors([]);
          setModifiable((prevModifiable) =>
            prevModifiable.map((row) => row.map(() => false))
          );
        } else {
          setSuccess("");
          setErrors(data.errors);
          setPaused(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [matrix]);

  function restartGame() {
    setMatrix(inicialMatrix);
    setHaveTime(true);
    setPaused(false);
    setSeconds(0);
    setMinutes(0);
    setErrors([]);
    setSuccess("");
    setRestarted(restarted + 1);
  }

  function handleChange(value, row, column) {
    if (/^[1-9]?$/.test(value)) {
      setMatrix((prevMatrix) => {
        const auxMatrix = JSON.parse(JSON.stringify(prevMatrix));
        auxMatrix[row][column] = Number(value);
        return auxMatrix;
      });
    }
  }

  return (
    <>
      <Nav />
      <Header>Jogo</Header>
      <Messages errors={errors} success={success} />
      <Content>
        <Sudoku
          setErrors={setErrors}
          setSuccess={setSuccess}
          setMatrix={setMatrix}
          matrix={matrix}
          boardId={boardId}
          haveTime={haveTime}
          handleChange={handleChange}
          modifiable={modifiable}
        />
        <Container>
          <Timer minutes={minutes} seconds={seconds} />
          <RestartButton
            $bg={redColor}
            $hoverbg={pinkColor}
            onClick={restartGame}
          >
            Recomeçar
          </RestartButton>
          <NewGameLink to={"/newgame"} $bg={redColor} $hoverbg={pinkColor}>
            Novo jogo aleatório
          </NewGameLink>
        </Container>
      </Content>
    </>
  );
}

export default Game;
