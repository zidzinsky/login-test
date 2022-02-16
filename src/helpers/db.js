const config = require('./config.db.json');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
  const { user, password, database } = config.database;

  // connect to db
  const sequelize = new Sequelize(database, user, password, { dialect: 'postgres' });

  // init models and add them to the exported db object
  db.User = require('../models/user.model')(sequelize);

  // sync all models with database
  await sequelize.sync();
}
