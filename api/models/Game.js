const { DataTypes } = require("sequelize");

const sequelize = require("../db");
const Board = require("./Board");
const User = require("./User");
const messages = require("../locales/messages");

const Game = sequelize.define("game", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  completionTime: {
    type: DataTypes.TIME,
    allowNull: false,
    primaryKey: false,
    validate: {
      notNull: {
        msg: messages.errors.nullCompletionTime,
      },
    },
  },
  matrix: {
    type: DataTypes.JSON,
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

Game.belongsTo(User);
Game.belongsTo(Board);

Game.prototype.isBoardUnchanged = function (baseMatrix) {
  const matrix = JSON.parse(this.matrix);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (baseMatrix[i][j] == 0) continue;
      if (matrix[i][j] != baseMatrix[i][j]) return false;
    }
  }
  return true;
};

Game.prototype.validateCompletedSudoku = function () {
  const matrix = JSON.parse(this.matrix);
  const invalidPositions = [];
  for (let i = 0; i < 9; i++) {
    const invalidsInRow = this.verifyRow(i, matrix);
    if (invalidsInRow.length !== 0) {
      for (const position of invalidsInRow) {
        if (
          !invalidPositions.some((pos) =>
            pos.every((val, index) => val === position[index])
          )
        )
          invalidPositions.push(position);
      }
    }
    const invalidsInColumn = this.verifyColumn(i, matrix);
    if (invalidsInColumn.length !== 0) {
      for (const position of invalidsInColumn) {
        if (
          !invalidPositions.some((pos) =>
            pos.every((val, index) => val === position[index])
          )
        )
          invalidPositions.push(position);
      }
    }
    const invalidsInQuadrant = this.verifyQuadrant(i, matrix);
    if (invalidsInQuadrant.length !== 0) {
      for (const position of invalidsInQuadrant) {
        if (
          !invalidPositions.some((pos) =>
            pos.every((val, index) => val === position[index])
          )
        )
          invalidPositions.push(position);
      }
    }
  }
  return invalidPositions;
};

Game.prototype.verifyRow = function (row, matrix) {
  const invalids = [];
  for (let i = 0; i < 9; i++) {
    let currentPositionPushed = false;
    if (matrix[row][i] == 0) {
      invalids.push([row, i]);
      continue;
    }
    for (let j = i + 1; j < 9; j++) {
      if (matrix[row][j] == 0) {
        invalids.push([row, j]);
      } else if (matrix[row][i] == matrix[row][j]) {
        const duplicateNumberPosition = [row, j];
        if (
          invalids.some((position) =>
            position.every(
              (val, index) => val === duplicateNumberPosition[index]
            )
          )
        ) {
          continue;
        }
        if (!currentPositionPushed) {
          invalids.push([row, i]);
          currentPositionPushed = !currentPositionPushed;
        }
        invalids.push(duplicateNumberPosition);
      }
    }
  }
  return invalids;
};

Game.prototype.verifyColumn = function (column, matrix) {
  const invalids = [];
  for (let i = 0; i < 9; i++) {
    if (matrix[i][column] == 0) {
      invalids.push([i, column]);
      continue;
    }
    let currentPositionPushed = false;
    for (let j = i + 1; j < 9; j++) {
      if (matrix[j][column] == 0) {
        invalids.push([j, column]);
      } else if (matrix[i][column] == matrix[j][column]) {
        const duplicateNumberPosition = [j, column];
        if (
          invalids.some((position) =>
            position.every(
              (val, index) => val === duplicateNumberPosition[index]
            )
          )
        ) {
          continue;
        }
        if (!currentPositionPushed) {
          invalids.push([i, column]);
          currentPositionPushed = !currentPositionPushed;
        }
        invalids.push(duplicateNumberPosition);
      }
    }
  }
  return invalids;
};

Game.prototype.verifyQuadrant = function (quadrant, matrix) {
  let firstRow = Math.floor(quadrant / 3) * 3;
  let firstColumn = (quadrant * 3) % 9;
  const invalids = [];
  for (let i = firstRow; i < firstRow + 3; i++) {
    for (let j = firstColumn; j < firstColumn + 3; j++) {
      if (matrix[i][j] == 0) {
        invalids.push([i, j]);
        continue;
      }
      let currentPositionPushed = false;
      for (let k = firstRow; k < firstRow + 3; k++) {
        for (let l = firstColumn; l < firstColumn + 3; l++) {
          if (matrix[k][l] == 0) {
            invalids.push([k, l]);
          } else if (matrix[i][j] == matrix[k][l] && (i != k || j != l)) {
            const duplicateNumberPosition = [k, l];
            if (
              invalids.some((position) =>
                position.every(
                  (val, index) => val === duplicateNumberPosition[index]
                )
              )
            ) {
              continue;
            }
            if (!currentPositionPushed) {
              invalids.push([i, j]);
              currentPositionPushed = !currentPositionPushed;
            }
            invalids.push(duplicateNumberPosition);
          }
        }
      }
    }
  }
  return invalids;
};

module.exports = Game;
