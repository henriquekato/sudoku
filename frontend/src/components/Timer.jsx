import styled from "styled-components";
import { darkColor } from "../styles/colors";

const StyledTimer = styled.div`
  font-size: 20px;
  border: 2px solid ${darkColor};
  border-radius: 5px;
  padding: 10px;
  max-width: 150px;
  text-align: center;
  display: inline-block;
  margin: 5px;
`;

function Timer(props) {
  return (
    <>
      <StyledTimer>
        Tempo:{" "}
        {`${props.minutes < 10 ? "0" : ""}${props.minutes}:${
          props.seconds < 10 ? "0" : ""
        }${props.seconds}`}
      </StyledTimer>
    </>
  );
}

export default Timer;
