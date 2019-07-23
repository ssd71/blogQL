const Sequelize = require('sequelize');

let sequelize;

if (process.env.DATABASE_URL) {
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
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
  });
}


const Post = require('./Post')(sequelize, Sequelize);

module.exports = {
  Post,
};
