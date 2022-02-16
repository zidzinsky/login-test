const config = require('./config.db.json');
const { Sequelize } = require('sequelize');
const { Client } = require('pg');

module.exports = db = {};

initialize();

async function initialize() {
  const { host, port, user, password, database } = config.database;
  const client = new Client({
    user: 'dbuser',
    host: 'database.server.com',
    database: 'mydb',
    password: 'secretpassword',
    port: 3211
  });
  await client.connect();

  await client.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, { dialect: 'postgres' });

  // init models and add them to the exported db object
  db.User = require('../models/user.model')(sequelize);

  // sync all models with database
  await sequelize.sync();
}
