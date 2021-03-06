const mariadb = require('mariadb');
const util = require('util');
const chalk = require('chalk');

let db = mariadb.createConnection({
    host: 'localhost', 
    user: 'shovon', 
    password: '123', 
    database: 'cookbook', 
    connectionLimit: 5
});

db.then(async conn => {
  let profiles = await conn.query("SELECT * FROM profile");
  
  
  if(profiles.length > 0) {
    console.log(chalk.hex('#935cc1')(`${profiles.length} ROWS MATCHED.`));
    profiles.forEach(profile => {
      if(profile.birth !== null) { // testing null database value
        console.log(`Hello, ${chalk.green(profile.name)}`);
      } else {
        console.log(`${chalk.red(profile.name)} it is! Please provide your birth date.`);
      }
    });
  } else {
    console.log(chalk.red("NO MATCH FOUND."));
  }

  conn.end();
}).catch(err => {
  console.log("Unable to connect to the database.");
});



