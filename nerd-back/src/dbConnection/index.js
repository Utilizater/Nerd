import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'milena666',
  database: 'nerdling',
  port: 2222,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
});

setInterval(function () {
  connection.query('SELECT 1');
}, 5000);

module.exports = connection;
