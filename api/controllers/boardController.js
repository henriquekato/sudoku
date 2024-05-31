const Sequelize = require("sequelize");

const Board = require("../models/Board");
const sequelize = require("../db");
const messages = require("../locales/messages");

exports.getAvailableBoardIds = async (req, res, next) => {
  try {
    await sequelize.sync({ force: false });
    const boards = await Board.findAll({ attributes: ["id"] });
    const boardIds = boards.map((ob) => {
      return ob["id"];
    });
    res.status(200).json({
      message: messages.success.list,
      boardIds: boardIds,
    });
  } catch (error) {
    res.status(500).json({ message: messages.errors.server });
  }
};

exports.getBoardById = async (req, res, next) => {
  try {
    await sequelize.sync({ force: false });

    const id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(401).json({ message: messages.errors.invalidId });
    }

    const board = await Board.findByPk(id);
    if (!board) {
      return res
        .status(404)
        .json({ message: messages.errors.boardDoesNotExist });
    }

    res.status(200).json({
      message: messages.success.list,
      id: board.id,
      board: JSON.parse(board.matrix),
    });
  } catch (error) {
    res.status(500).json({ message: messages.errors.server });
  }
};

exports.create = async (req, res, next) => {
  try {
    await sequelize.sync({ force: false });
    const board = await Board.build({
      matrix: JSON.stringify(req.body.matrix),
    });

    await board.validate();

    const invalidNumberPositions = board.validateIncompleteSudoku();
    if (invalidNumberPositions.length != 0) {
      return res.status(422).json({
        message: messages.errors.invalidSudokuGame,
        invalidNumberPositions,
      });
    }

    await board.save();

    res.status(201).json({
      message: messages.success.boardCreated,
    });
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      return res.status(400).json({
        message: messages.errors.invalidSudokuBoard,
      });
    }
    res.status(500).json({ message: messages.errors.server });
  }
};

exports.edit = async (req, res, next) => {
  try {
    await sequelize.sync({ force: false });

    const id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(401).json({ message: messages.errors.invalidId });
    }

    const board = await Board.findByPk(id);
    if (!board) {
      return res
        .status(404)
        .json({ message: messages.errors.boardDoesNotExist });
    }

    const newBoard = await Board.build({
      matrix: JSON.stringify(req.body.matrix),
    });

    await newBoard.validate();

    const invalidNumberPositions = newBoard.validateIncompleteSudoku();
    if (invalidNumberPositions.length != 0) {
      return res.status(422).json({
        message: messages.errors.invalidSudokuGame,
        invalidNumberPositions,
      });
    }

    await Board.upsert({
      id: req.params.id,
      matrix: JSON.stringify(req.body.matrix),
    });

    res.status(200).json({
      message: messages.success.boardEdited,
    });
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      return res.status(400).json({
        message: messages.errors.invalidSudokuBoard,
      });
    }
    res.status(500).json({ message: messages.errors.server });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await sequelize.sync({ force: false });

    const id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(401).json({ message: messages.errors.invalidId });
    }

    const board = await Board.destroy({ where: { id } });
    if (!board) {
      return res
        .status(404)
        .json({ message: messages.errors.boardDoesNotExist });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: messages.errors.server });
  }
};
