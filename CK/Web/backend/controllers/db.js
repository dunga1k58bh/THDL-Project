const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : 'localhost',
        port : 3306,
        user : 'ntd275',
        password : 'nguyentheduc',
        database : 'phone'
      },
      log: {
        warn(message) {
          console.log(message);
        },
        error(message) {
          console.log(message);
        },
        deprecate(message) {
          console.log(message);
        },
        debug(message) {
          console.log(message);
        },
      }
});

const { attachPaginate } = require('knex-paginate');
attachPaginate();

module.exports = knex