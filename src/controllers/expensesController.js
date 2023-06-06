'use strict';

const userService = require('../services/users.js');
const expensesService = require('../services/expenses.js');

const getAll = (req, res) => {
  const expenses = expensesService.getAll(req.query);

  res.send(expenses);
};

const getOne = (req, res) => {
  const expenseId = Number(req.params.expenseId);

  if (isNaN(expenseId)) {
    res.sendStatus(400);

    return;
  }

  const foundedExpense = expensesService.getById(expenseId);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundedExpense);
};

const createExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getUser(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService
    .create(userId, spentAt, title, amount, category, note);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const expenseId = Number(req.params.expenseId);
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const expenseId = Number(req.params.expenseId);

  if (isNaN(expenseId)) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const {
    userId = foundExpense.userId,
    spentAt = foundExpense.spentAt,
    title = foundExpense.title,
    amount = foundExpense.amount,
    category = foundExpense.category,
    note = foundExpense.note,
  } = req.body;

  if (!userService.getUser(userId)) {
    res.sendStatus(400);

    return;
  }

  expensesService.update({
    id: expenseId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(foundExpense);
};

module.exports = {
  getAll,
  remove,
  update,
  createExpense,
  getOne,
};