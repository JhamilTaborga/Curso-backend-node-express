const { config } = require('../config/config');

module.exports = {
  development: {
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    host: config.dbHost,
    port: config.dbPort,
    dialect: config.dbEngine,
  },
  production: {
    url: config.dbUrl,
    dialect: config.dbEngine,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
}
