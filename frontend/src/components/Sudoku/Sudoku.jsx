import styled from "styled-components";
import Square from "./Square";
import { darkColor, pinkColor, redColor } from "../../styles/colors";

const StyledSudoku = styled.table`
  border-collapse: collapse;
  margin: 0 10px 40px;
  max-width: 400px;
  max-height: 400px;

  td:nth-child(1) {
    border-left: 3px solid black;
  }

  td:nth-child(3n) {
    border-right: 3px solid black;
  }

  tr:nth-child(1) td {
    border-top: 3px solid black;
  }

  tr:nth-child(3n) td {
    border-bottom: 3px solid black;
  }
`;

const StyledTd = styled.td`
  font-size: 1.2em;
  width: 40px;
  height: 40px;
  text-align: center;
  border: 1px solid black;
  background-color: rgba(0, 0, 0, 0.1);
  color: ${(props) => props.$color || darkColor};
  font-weight: ${(props) => props.$color && 700};
`;

function Sudoku(props) {
  function styleInvalidSquare(indexRow, indexColumn) {
    if (props.invalidPositionsMatrix.length == 0) return false;
    return props.invalidPositionsMatrix[indexRow][indexColumn];
  }

  return (
    <>
      {props.modifiable && (
        <StyledSudoku>
          <tbody>
            {props.matrix.map((row, indexRow) => (
              <tr key={indexRow}>
                {row.map((value, indexColumn) => {
                  if (props.modifiable[indexRow][indexColumn]) {
                    return (
                      <StyledTd key={`${indexRow}${indexColumn}`}>
                        <Square
                          $bg={
                            styleInvalidSquare(indexRow, indexColumn) &&
                            pinkColor
                          }
                          value={value ? value : ""}
                          handleChange={props.handleChange}
                          row={indexRow}
                          column={indexColumn}
                        />
                      </StyledTd>
                    );
                  } else {
                    return (
                      <StyledTd
                        key={`${indexRow}${indexColumn}`}
                        $color={
                          styleInvalidSquare(indexRow, indexColumn) && redColor
                        }
                      >
                        {value}
                      </StyledTd>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </StyledSudoku>
      )}
    </>
  );
}

export default Sudoku;
