const mariadb = require('mariadb');
const chalk = require('chalk');
const readOptionFile = require('./libs/read_mysql_option_file');

let opts = readOptionFile('../conf/mysql.cnf');

let db = mariadb.createConnection({
  host: opts['host'], 
  user: opts['user'], 
  password: opts['password'], 
  database: 'cookbook', 
  connectionLimit: 5
});

db.then(conn => {
  console.log(chalk.green("Connection established."));

  conn.end();
  console.log(chalk.blue("Connection closed."));
}).catch(err => {
  console.log(chalk.red("Unable to connect to the database."));
});
