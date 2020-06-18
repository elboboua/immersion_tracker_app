// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_DB,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },
  production: {
    client: 'mysql',
    connection: {
      port: process.env.REMOTE_DB_PORT,
      host: process.env.REMOTE_DB_HOST,
      database: process.env.REMOTE_DB_DB,
      user: process.env.REMOTE_DB_USER,
      password: process.env.REMOTE_DB_PASSWORD,
    },
  }

};
