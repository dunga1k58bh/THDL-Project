const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : 'localhost',
        port : 3306,
        user : 'ntd275',
        password : 'nguyentheduc',
        database : 'phone'
      },
});

const { attachPaginate } = require('knex-paginate');
attachPaginate();

module.exports = knex