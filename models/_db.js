var Sequelize = require('sequelize');

var db = new Sequelize(process.env.DATABASE_URL, {
  logging: false
});

module.exports = db;
