import styled from "styled-components";

const StyledTimer = styled.div``;

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
