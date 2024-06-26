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
import { newGameUri, validateGameUri } from "../apiEndpoints";
import { AuthContext } from "../AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import verifySudoku from "../utils/verifySudoku";

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
  const [load, setLoad] = useState(0);
  const [boardId, setBoardId] = useState(useParams().boardId);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [inicialMatrix, setInicialMatrix] = useState([]);
  const [matrix, setMatrix] = useState([]);
  const [modifiable, setModifiable] = useState();
  const [invalidPositionsMatrix, setInvalidPositionsMatrix] = useState([]);
  const [restart, setRestart] = useState(0);
  const [haveTime, setHaveTime] = useState(true);
  const [isPaused, setPaused] = useState(true);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");

  //get board
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
          const responseMatrix = JSON.parse(data.matrix);
          setInicialMatrix(responseMatrix);
          setMatrix(responseMatrix);
          setBoardId(data.id);
          setPaused(false);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [load]);

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
        setHaveTime(!haveTime);
        setErrors(["Você não cumpriu o jogo em 1 hora, tente recomeçar."]);
        setModifiable(createMatrixOfFalse);
      }
    }, 1000);

    return () => clearInterval(incrementTime);
  }, [seconds, haveTime, isPaused]);

  function createMatrixOfFalse() {
    const aux = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        row.push(false);
      }
      aux.push(row);
    }
    return aux;
  }

  //set modifiable fields
  useEffect(() => {
    if (inicialMatrix.length == 0) return;

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
  }, [restart, inicialMatrix]);

  //check if is completed
  useEffect(() => {
    if (matrix.length == 0) return;
    const invalidPositions = verifySudoku(matrix);
    if (invalidPositions.length > 0) {
      createInvalidPositionsMatrix(invalidPositions);
      return;
    }
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
          setInvalidPositionsMatrix([]);
        } else {
          setSuccess("");
          setErrors(data.errors);
          setPaused(false);
          createInvalidPositionsMatrix(data.invalidNumberPositions);
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
    setRestart(restart + 1);
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

  function handleLoad() {
    setBoardId();
    setLoad(load + 1);
    restartGame();
  }

  function createInvalidPositionsMatrix(invalidNumberPositions) {
    const auxMatrix = [];
    let auxIndex = 0;
    for (let i = 0; i < 9; i++) {
      const auxRow = [];
      for (let j = 0; j < 9; j++) {
        if (auxIndex == invalidNumberPositions.length) {
          auxRow.push(false);
          continue;
        }
        const [row, column] = invalidNumberPositions[auxIndex];
        if (row == i && column == j) {
          auxRow.push(true);
          auxIndex++;
        } else {
          auxRow.push(false);
        }
      }
      auxMatrix.push(auxRow);
    }
    setInvalidPositionsMatrix(auxMatrix);
  }

  return (
    <>
      <Nav />
      <Header>Jogo</Header>
      <Messages errors={errors} success={success} />
      <Content>
        {matrix.length > 0 && (
          <Sudoku
            setErrors={setErrors}
            setSuccess={setSuccess}
            setMatrix={setMatrix}
            matrix={matrix}
            boardId={boardId}
            haveTime={haveTime}
            handleChange={handleChange}
            modifiable={modifiable}
            invalidPositionsMatrix={invalidPositionsMatrix}
          />
        )}
        <Container>
          <Timer minutes={minutes} seconds={seconds} />
          <RestartButton
            $bg={redColor}
            $hoverbg={pinkColor}
            onClick={restartGame}
          >
            Recomeçar
          </RestartButton>
          <NewGameLink
            to={"/game"}
            onClick={handleLoad}
            $bg={redColor}
            $hoverbg={pinkColor}
          >
            Novo jogo aleatório
          </NewGameLink>
        </Container>
      </Content>
    </>
  );
}

export default Game;
