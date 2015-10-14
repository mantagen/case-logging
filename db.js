// var knex = require('knex')({
//     client: 'postgres',
//     connection: process.env.DATABASE_URL
// });
var knex = require('knex')({
  client: 'postgres',
  connection: {
    host     : 'localhost',
    user     : 'mg',
    password : 'x',
    database : 'victims_voice_db',
    charset  : 'utf8'
  }
});
var DB = require('bookshelf')(knex);

module.exports.DB = DB;
