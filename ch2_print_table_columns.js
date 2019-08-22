const mariadb = require('mariadb');
const chalk = require('chalk');

let db = mariadb.createConnection({
    host: 'localhost', 
    user: 'shovon', 
    password: '123', 
    database: 'cookbook', 
    connectionLimit: 5
});

db.then(async (conn) => {
  let results = null;
  let data = {
    database: 'cookbook', // change this
    table: 'limbs'  // change this
  };

  try {
    results = await conn.query("SELECT column_name FROM information_schema.columns WHERE table_schema = ? AND table_name = ?", [data.database, data.table]);
    
    if(results.length > 0) {
      console.log(chalk.green(`${results.length} columns in ${data.database}/${data.table}`));
      results.forEach(colName => {
        console.log(chalk.yellow(colName.column_name));
      });
    } else {
      console.log(chalk.red(`${data.database}/${data.table} does not exists.`));
    }

  } catch(err) {
      console.log('An error occured while executing queries.');
  } finally {
    conn.end();
  }
  
}).catch(err => {
  console.log("Unable to connect to the database.");
});
