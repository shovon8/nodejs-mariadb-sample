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
  let mails = await conn.query("SELECT DATE_FORMAT(t, '%M %e, %Y') AS date_sent, CONCAT(srcuser, '@', srchost) AS sender, size FROM mail");
  
  
  if(mails.length > 0) {
    console.log(chalk.hex('#935cc1')(`${mails.length} ROWS MATCHED.`));
    mails.forEach(mail => {
      console.log(`${chalk.green(mail.sender)} sent a ${chalk.blue(mail.size)} bytes email on ${chalk.yellow(mail.date_sent)} `);
    });
  } else {
    console.log(chalk.red("NO MATCH FOUND."));
  }

  conn.end();
}).catch(err => {
  console.log("Unable to connect to the database.");
});



