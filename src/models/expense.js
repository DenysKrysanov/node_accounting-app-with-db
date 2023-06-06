'use strict';

const { sequelize } = require('../utils/db.js');
const { DataTypes } = require('sequelize');

const Expense = sequelize.define('Expense', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },

  spentAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tablename: 'expenses',
  updatedAt: false,
  createdAt: false,
});

module.exports = { Expense };