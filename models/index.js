const Sequelize = require('sequelize');

let sequelize;

if (process.env.DATABASE_URL) {
  // For Heroku

  // Initialize Sequelize using Postgres
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',

    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  });
} else {
  // For local development and testing

  // Initialize Sequelize using SQLite3
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
  });
}

// For Exporting
const Post = require('./Post')(sequelize, Sequelize);

module.exports = {
  Post,
};
