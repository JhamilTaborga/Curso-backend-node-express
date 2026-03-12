const { Sequelize } = require('sequelize');

const { config } = require('../api/config/config');
const setupModels = require('../api/db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  host: 'localhost',
  dialect: 'postgres'
});

setupModels(sequelize);

module.exports = sequelize;
