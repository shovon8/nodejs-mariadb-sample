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
  let result = null;
  let user = {
    name: "De'Mont",
    birth: '1995-12-16',
    color: null,
    foods: 'eggroll',
    cats: '4' 
  };

  try {
    result = await conn.query("INSERT INTO profile(name, birth, color, foods, cats) VALUES(?, ?, ?, ?, ?)", [user.name, user.birth, user.color, user.foods, user.cats]);
    
    if(result.affectedRows > 0) {
      console.log(chalk.green("A new profile is created."));
    } else {
      console.log(chalk.red("Unable to create profile."));
    }

  } catch(err) {
      console.log('An error occured while executing queries.');
  } finally {
    conn.end();
  }
  
}).catch(err => {
  console.log("Unable to connect to the database.");
});
