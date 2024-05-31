const { DataTypes } = require("sequelize");

const sequelize = require("../db");

const Board = sequelize.define("board", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  matrix: {
    type: DataTypes.JSON,
    allowNull: false,
    primaryKey: false,
  },
});

Board.prototype.validateIncompleteSudoku = function () {
  const matrix = JSON.parse(this.matrix);
  const duplicateNumberPositions = [];
  for (let i = 0; i < 9; i++) {
    const repeatedInRow = verifyIfRepeatedInRow(i, matrix);
    if (repeatedInRow.length !== 0) {
      for (const position of repeatedInRow) {
        if (
          !duplicateNumberPositions.some((pos) =>
            pos.every((val, index) => val === position[index])
          )
        )
          duplicateNumberPositions.push(position);
      }
    }
    const repeatedInColumn = verifyIfRepeatedInColumn(i, matrix);
    if (repeatedInColumn.length !== 0) {
      for (const position of repeatedInColumn) {
        if (
          !duplicateNumberPositions.some((pos) =>
            pos.every((val, index) => val === position[index])
          )
        )
          duplicateNumberPositions.push(position);
      }
    }
    const repeatedInQuadrant = verifyIfRepeatedInQuadrant(i, matrix);
    if (repeatedInQuadrant.length !== 0) {
      for (const position of repeatedInQuadrant) {
        if (
          !duplicateNumberPositions.some((pos) =>
            pos.every((val, index) => val === position[index])
          )
        )
          duplicateNumberPositions.push(position);
      }
    }
  }
  return duplicateNumberPositions;
};

function verifyIfRepeatedInRow(row, matrix) {
  const repeated = [];
  for (let i = 0; i < 9; i++) {
    if (matrix[row][i] == 0) continue;
    let currentPositionPushed = false;
    for (let j = i + 1; j < 9; j++) {
      if (matrix[row][j] == 0) continue;
      if (matrix[row][i] == matrix[row][j]) {
        const duplicateNumberPosition = [row, j];
        if (
          repeated.some((position) =>
            position.every(
              (val, index) => val === duplicateNumberPosition[index]
            )
          )
        ) {
          continue;
        }
        if (!currentPositionPushed) {
          repeated.push([row, i]);
          currentPositionPushed = !currentPositionPushed;
        }
        repeated.push(duplicateNumberPosition);
      }
    }
  }
  return repeated;
}

function verifyIfRepeatedInColumn(column, matrix) {
  const repeated = [];
  for (let i = 0; i < 9; i++) {
    if (matrix[i][column] == 0) continue;
    let currentPositionPushed = false;
    for (let j = i + 1; j < 9; j++) {
      if (matrix[j][column] == 0) continue;
      if (matrix[i][column] == matrix[j][column]) {
        const duplicateNumberPosition = [j, column];
        if (
          repeated.some((position) =>
            position.every(
              (val, index) => val === duplicateNumberPosition[index]
            )
          )
        ) {
          continue;
        }
        if (!currentPositionPushed) {
          repeated.push([i, column]);
          currentPositionPushed = !currentPositionPushed;
        }
        repeated.push(duplicateNumberPosition);
      }
    }
  }
  return repeated;
}

function verifyIfRepeatedInQuadrant(quadrant, matrix) {
  let firstRow = Math.floor(quadrant / 3) * 3;
  let firstColumn = (quadrant * 3) % 9;
  const repeated = [];
  for (let i = firstRow; i < firstRow + 3; i++) {
    for (let j = firstColumn; j < firstColumn + 3; j++) {
      if (matrix[i][j] == 0) continue;
      let currentPositionPushed = false;
      for (let k = firstRow; k < firstRow + 3; k++) {
        for (let l = firstColumn; l < firstColumn + 3; l++) {
          if (matrix[k][l] == 0) continue;
          if (matrix[i][j] == matrix[k][l] && (i != k || j != l)) {
            const duplicateNumberPosition = [k, l];
            if (
              repeated.some((position) =>
                position.every(
                  (val, index) => val === duplicateNumberPosition[index]
                )
              )
            ) {
              continue;
            }
            if (!currentPositionPushed) {
              repeated.push([i, j]);
              currentPositionPushed = !currentPositionPushed;
            }
            repeated.push(duplicateNumberPosition);
          }
        }
      }
    }
  }
  return repeated;
}

module.exports = Board;
