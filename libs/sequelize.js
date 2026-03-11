const { Sequelize } = require('sequelize');

const { config } = require('../api/config/config');
const setupModels = require('../api/db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  host: 'localhost',
  dialect: 'mysql'
});

setupModels(sequelize);

sequelize.sync();

module.exports = sequelize;
