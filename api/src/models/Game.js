const { DataTypes } = require("sequelize");

const sequelize = require("../database/db");
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

  function addIfUnique(positions) {
    for (const position of positions) {
      if (
        !invalidPositions.some((pos) =>
          pos.every((val, index) => val === position[index])
        )
      )
        invalidPositions.push(position);
    }
  }

  for (let i = 0; i < 9; i++) {
    addIfUnique(this.verifyRow(i, matrix));
    addIfUnique(this.verifyColumn(i, matrix));
    addIfUnique(this.verifyQuadrant(i, matrix));
  }
  return invalidPositions;
};

Game.prototype.verifyRow = function (row, matrix) {
  const seenNumbers = new Set();
  const invalids = [];

  for (let i = 0; i < 9; i++) {
    const currentNumber = matrix[row][i];
    const currentPosition = [row, i];
    if (seenNumbers.has(currentNumber)) continue;
    if (currentNumber == 0) {
      invalids.push(currentPosition);
      continue;
    }

    let isCurrentPositionPushed = false;
    for (let j = i + 1; j < 9; j++) {
      if (currentNumber == matrix[row][j]) {
        if (!isCurrentPositionPushed) {
          invalids.push(currentPosition);
          isCurrentPositionPushed = !isCurrentPositionPushed;
        }
        invalids.push([row, j]);
      }
    }
    seenNumbers.add(currentNumber);
  }
  return invalids;
};

Game.prototype.verifyColumn = function (column, matrix) {
  const seenNumbers = new Set();
  const invalids = [];

  for (let i = 0; i < 9; i++) {
    const currentNumber = matrix[i][column];
    const currentPosition = [i, column];
    if (seenNumbers.has(currentNumber)) continue;
    if (currentNumber == 0) {
      invalids.push(currentPosition);
      continue;
    }

    let isCurrentPositionPushed = false;
    for (let j = i + 1; j < 9; j++) {
      if (currentNumber == matrix[j][column]) {
        if (!isCurrentPositionPushed) {
          invalids.push(currentPosition);
          isCurrentPositionPushed = !isCurrentPositionPushed;
        }
        invalids.push([j, column]);
      }
    }
    seenNumbers.add(currentNumber);
  }
  return invalids;
};

Game.prototype.verifyQuadrant = function (quadrant, matrix) {
  let firstRow = Math.floor(quadrant / 3) * 3;
  let firstColumn = (quadrant * 3) % 9;
  const seenNumbers = new Set();
  const invalids = [];

  for (let i = firstRow; i < firstRow + 3; i++) {
    for (let j = firstColumn; j < firstColumn + 3; j++) {
      const currentNumber = matrix[i][j];
      const currentPosition = [i, j];
      if (seenNumbers.has(currentNumber)) continue;
      if (currentNumber == 0) {
        invalids.push(currentPosition);
        continue;
      }

      let isCurrentPositionPushed = false;
      for (let k = firstRow; k < firstRow + 3; k++) {
        for (let l = firstColumn; l < firstColumn + 3; l++) {
          if (currentNumber == matrix[k][l] && (i != k || j != l)) {
            if (!isCurrentPositionPushed) {
              invalids.push(currentPosition);
              isCurrentPositionPushed = !isCurrentPositionPushed;
            }
            invalids.push([k, l]);
          }
        }
      }
      seenNumbers.add(currentNumber);
    }
  }
  return invalids;
};

module.exports = Game;
