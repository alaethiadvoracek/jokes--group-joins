const pg = require('pg');
const Pool = pg.Pool;
const config = {
    database: 'jokes',
    host: 'localhost',
    port: 5432,
    max: 10, // how many connections at a time
    idleTimeoutMillis: 5000 // 5 seconds
};

// create an instance of the pool object
const pool = new Pool(config);

module.exports = pool;
