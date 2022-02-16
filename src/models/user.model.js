const { DataTypes } = require('sequelize');

function model(sequelize) {
  const attributes = {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    hash: { type: DataTypes.STRING, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: true }
  };

  const options = {
    defaultScope: {
      attributes: { exclude: ['hash'] }
    },
    scopes: {
      withHash: { attributes: {} }
    },
    tableName: 'users'
  };

  return sequelize.define('User', attributes, options);
}

module.exports = model;
