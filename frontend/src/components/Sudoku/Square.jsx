import styled from "styled-components";

const StyledSquare = styled.input`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 20px;
  outline: none;
  &:focus {
    border: 2px solid black;
  }
`;

function Square(props) {
  return (
    <StyledSquare
      type="text"
      value={props.value}
      onChange={(e) => {
        const value = e.target.value;
        props.handleChange(value, props.row, props.column);
      }}
    />
  );
}

export default Square;
