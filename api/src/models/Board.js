const { DataTypes } = require("sequelize");

const sequelize = require("../database/db");
const messages = require("../locales/messages");

const Board = sequelize.define("board", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  matrix: {
    type: DataTypes.TEXT,
    allowNull: false,
    primaryKey: false,
    validate: {
      is: {
        args: /^\[\s*(\[(\s*\d\s*,\s*){8}\d\],*\s*){9}\s*\]$/,
        msg: messages.errors.invalidSudokuBoard,
      },
    },
  },
});

Board.prototype.validateIncompleteSudoku = function () {
  const matrix = JSON.parse(this.matrix);
  const duplicateNumberPositions = [];
  for (let i = 0; i < 9; i++) {
    const repeatedInRow = this.verifyIfRepeatedInRow(i, matrix);
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
    const repeatedInColumn = this.verifyIfRepeatedInColumn(i, matrix);
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
    const repeatedInQuadrant = this.verifyIfRepeatedInQuadrant(i, matrix);
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

Board.prototype.verifyIfRepeatedInRow = function (row, matrix) {
  const repeated = [];
  for (let i = 0; i < 9; i++) {
    if (matrix[row][i] == 0) continue;
    let currentPositionPushed = false;
    for (let j = i + 1; j < 9; j++) {
      if (matrix[row][j] == 0) continue;
      if (matrix[row][i] == matrix[row][j]) {
        const duplicateNumberPosition = [row, j];
        if (!currentPositionPushed) {
          repeated.push([row, i]);
          currentPositionPushed = !currentPositionPushed;
        }
        repeated.push(duplicateNumberPosition);
      }
    }
  }
  return repeated;
};

Board.prototype.verifyIfRepeatedInColumn = function (column, matrix) {
  const repeated = [];
  for (let i = 0; i < 9; i++) {
    if (matrix[i][column] == 0) continue;
    let currentPositionPushed = false;
    for (let j = i + 1; j < 9; j++) {
      if (matrix[j][column] == 0) continue;
      if (matrix[i][column] == matrix[j][column]) {
        const duplicateNumberPosition = [j, column];
        if (!currentPositionPushed) {
          repeated.push([i, column]);
          currentPositionPushed = !currentPositionPushed;
        }
        repeated.push(duplicateNumberPosition);
      }
    }
  }
  return repeated;
};

Board.prototype.verifyIfRepeatedInQuadrant = function (quadrant, matrix) {
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
};

module.exports = Board;
