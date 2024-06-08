const Sequelize = require("sequelize");

const Game = require("../models/Game");
const Board = require("../models/Board");
const User = require("../models/User");
const sequelize = require("../db");
const messages = require("../locales/messages");

exports.newSudoku = async (req, res, next) => {
  try {
    await sequelize.sync({ force: false });

    const boards = await Board.findAll({ attributes: ["id"] });
    if (boards.length == 0) {
      return res.status(204).send();
    }

    const boardIds = boards.map((ob) => {
      return ob["id"];
    });
    const randomIndex = Math.floor(Math.random() * boardIds.length);
    const boardId = boardIds[randomIndex];

    const board = await Board.findByPk(boardId);
    res.status(200).json({
      success: messages.success.list,
      id: board.id,
      matrix: board.matrix,
    });
  } catch (error) {
    res.status(500).json({ errors: [messages.errors.server] });
  }
};

exports.newSudokuByBoardId = async (req, res, next) => {
  try {
    await sequelize.sync({ force: false });

    const boardId = parseInt(req.params.boardId);
    if (!Number.isInteger(boardId)) {
      return res.status(400).json({ errors: [messages.errors.invalidId] });
    }

    const board = await Board.findByPk(boardId);
    if (!board) {
      return res
        .status(404)
        .json({ errors: [messages.errors.boardDoesNotExist] });
    }

    res.status(200).json({
      success: messages.success.list,
      id: board.id,
      matrix: board.matrix,
    });
  } catch (error) {
    res.status(500).json({ errors: [messages.errors.server] });
  }
};

exports.sudokuValidation = async (req, res, next) => {
  try {
    await sequelize.sync({ force: false });

    const boardId = parseInt(req.body.boardId);
    if (!Number.isInteger(boardId)) {
      return res.status(400).json({ errors: [messages.errors.invalidId] });
    }

    const board = await Board.findByPk(boardId);
    if (!board) {
      return res
        .status(404)
        .json({ errors: [messages.errors.boardDoesNotExist] });
    }

    const game = await Game.build({
      completionTime: req.body.completionTime,
      userId: res.locals.user.id,
      boardId,
      matrix: JSON.stringify(req.body.matrix),
    });

    await game.validate();

    if (!game.isBoardUnchanged(JSON.parse(board.matrix))) {
      return res
        .status(400)
        .json({ errors: [messages.errors.boardHasBeenChanged] });
    }

    const invalidNumberPositions = game.validateCompletedSudoku();
    if (invalidNumberPositions.length != 0) {
      return res.status(422).json({
        errors: [messages.errors.incorrectSudokuSolution],
        invalidNumberPositions,
      });
    }

    await game.save();

    res.status(201).json({
      success: messages.success.gameCompleted,
    });
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      const errorsMessage = [];
      error.errors.forEach((e) => {
        errorsMessage.push(e.message);
      });
      res.status(400).json({
        errors: errorsMessage,
      });
    } else if (error.name == "SequelizeDatabaseError") {
      return res.status(400).json({
        errors: [messages.errors.invalidTime],
      });
    } else {
      res.status(500).json({ errors: [messages.errors.server] });
    }
  }
};

exports.completedGames = async (req, res, next) => {
  try {
    await sequelize.sync({ force: false });
    const games = await Game.findAll({
      attributes: ["id", "completionTime", "boardId"],
      where: {
        userId: res.locals.user.id,
      },
    });
    res.status(200).json({
      success: messages.success.list,
      games: games,
    });
  } catch (error) {
    res.status(500).json({ errors: [messages.errors.server] });
  }
};

exports.completedGameById = async (req, res, next) => {
  try {
    await sequelize.sync({ force: false });

    const gameId = parseInt(req.params.gameId);
    if (!Number.isInteger(gameId)) {
      return res.status(400).json({ errors: [messages.errors.invalidId] });
    }

    let game = await Game.findByPk(gameId);
    if (!game) {
      return res
        .status(404)
        .json({ errors: [messages.errors.gameDoesNotExist] });
    }

    if (game.userId != res.locals.user.id) {
      return res
        .status(403)
        .json({ errors: [messages.errors.unauthorizedAccess] });
    }

    game = {
      id: game.id,
      completionTime: game.completionTime,
      matrix: game.matrix,
      boardId: game.boardId,
    };

    res.status(200).json({
      success: messages.success.list,
      game: game,
    });
  } catch (error) {
    res.status(500).json({ errors: [messages.errors.server] });
  }
};

exports.rankingByBoard = async (req, res, next) => {
  try {
    await sequelize.sync({ force: false });

    const boardId = parseInt(req.params.boardId);
    if (!Number.isInteger(boardId)) {
      return res.status(400).json({ errors: [messages.errors.invalidId] });
    }

    const board = await Board.findByPk(boardId);
    if (!board) {
      return res
        .status(404)
        .json({ errors: [messages.errors.boardDoesNotExist] });
    }

    const ranking = await Game.findAll({
      attributes: [
        "id",
        "completionTime",
        [Sequelize.literal('"user"."name"'), "userName"],
      ],
      where: {
        boardId: boardId,
      },
      include: [{ model: User, attributes: [] }],
      order: [["completionTime", "ASC"]],
      limit: 10,
    });
    res.status(200).json({
      success: messages.success.list,
      ranking: ranking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [messages.errors.server] });
  }
};
