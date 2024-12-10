require('dotenv').config();

module.exports = {
  development: {
    dialect: 'mariadb',
    username: process.env.DB_USER ,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME ,
    host: process.env.DB_HOST ,
  },
  test: {
    username: process.env.DB_USER ,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME ,
    host: process.env.DB_HOST ,
    dialect: 'mariadb',
    /* logging: false, */
  },
  production: {
    dialect: 'mariadb',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    /* logging: false, */
    /* dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    }, */
  },
};