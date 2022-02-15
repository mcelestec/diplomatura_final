var mysql = require('mysql');
var util = require('util');


var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.MySQL_HOST,
  user            : process.env.MySQL_USER,
  password        : process.env.MySQL_PASSWORD,
  database        : process.env.MySQL_DB_NAME,
  port            : process.env.MySQL_PORT,
});

pool.query = util.promisify(pool.query);

module.exports = pool;