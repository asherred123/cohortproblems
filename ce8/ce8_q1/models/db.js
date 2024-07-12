const mysql = require('mysql2')


let pool = mysql
  .createPool({
    host: "localhost",
    user: "user1",
    database: "ce8q1",
    password: "Password123!",
    connectionLimit: 10,
  })
  .promise();


async function cleanup() {
    await pool.end();
}

module.exports = {pool, cleanup};