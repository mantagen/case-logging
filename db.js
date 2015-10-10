var knex = require('knex')({
    client: 'postgres',
    connection: process.env.DATABASE_URL
});

var DB = require('bookshelf')(knex);

module.exports.DB = DB;
