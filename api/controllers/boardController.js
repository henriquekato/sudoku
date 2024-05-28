const Board = require("../models/Board");
const sequelize = require("../db");
const messages = require("../locales/messages");

exports.ids = async (req, res, next) => {
  try {
    await sequelize.sync({ force: false });
    const boards = await Board.findAll({ attributes: ["id"] });
    const boardIds = boards.map((ob) => {
      return ob["id"];
    });
    res.status(200).json({
      message: messages.success.getBoard,
      boardIds: boardIds,
    });
  } catch (error) {
    res.status(500).json({ message: messages.errors.server });
  }
};

exports.getBoardById = async (req, res, next) => {
  try {
    await sequelize.sync({ force: false });
    const board = await Board.findByPk(req.params.id);

    if (!board) {
      return res
        .status(404)
        .json({ message: messages.errors.boardDoesNotExist });
    }

    res.status(200).json({
      message: messages.success.getBoard,
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
    await Board.create({
      matrix: JSON.stringify(req.body.matrix),
    });
    res.status(201).json({
      message: messages.success.createBoard,
    });
  } catch (error) {
    res.status(500).json({ message: messages.errors.server });
  }
};

exports.edit = async (req, res, next) => {
  try {
    await sequelize.sync({ force: false });
    
    const board = await Board.findByPk(req.params.id);
    if (!board) {
      return res
        .status(404)
        .json({ message: messages.errors.boardDoesNotExist });
    }

    await Board.upsert({
      id: req.params.id,
      matrix: JSON.stringify(req.body.matrix),
    });

    res.status(200).json({
      message: messages.success.editBoard,
    });
  } catch (error) {
    res.status(500).json({ message: messages.errors.server });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await sequelize.sync({ force: false });
    const board = await Board.destroy({ where: { id: req.params.id } });

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
