const mariadb = require('mariadb');
const util = require('util');
const chalk = require('chalk');
const moment = require('moment');

let db = mariadb.createConnection({
    host: 'localhost', 
    user: 'shovon', 
    password: '123', 
    database: 'cookbook',
    connectionLimit: 5
});

db.then(async conn => {
  // let score = 47;
  // let expts = await conn.query("SELECT * FROM expt WHERE score = ?", [score]);

  // // this one can't handle NULL input;
  // let score = null;
  // let expts = await conn.query("SELECT * FROM expt WHERE score = ?", [score]);


  // this one handles null input correctly
  let score = null;
  let operator = Number.isInteger(score) ? '=' : 'IS';
  let expts = await conn.query(`SELECT * FROM expt WHERE score ${operator} ?`, [score]);

  if(expts.length > 0) {
    expts.forEach(expt => {
      console.log(expt);
    });
  } else {
    console.log(chalk.red("NO MATCH FOUND."));
  }

  conn.end();
}).catch(err => {
  console.log("Unable to connect to the database.");
});



