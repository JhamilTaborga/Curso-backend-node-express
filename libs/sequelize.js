const { Sequelize } = require('sequelize');
const { config } = require('../api/config/config');
const setupModels = require('../api/db/models');

const options = {
  dialect: config.dbEngine,
  logging: config.isProd ? false : true,
}

if(config.isProd) {
  options.dialectModule = require('pg')
  options.dialectOptions = {
    ssl: {

      require: true,
      rejectUnauthorized: false,
    }
  }
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

module.exports = sequelize;
