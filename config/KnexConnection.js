require('dotenv').config();
let environment = process.env.ENVIRONMENT || 'development';
let config = require('../knexfile')[environment];
let connection = require('knex')(config);

module.exports = connection;