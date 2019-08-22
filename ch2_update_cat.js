const mariadb = require('mariadb');

let db = mariadb.createConnection({
    host: 'localhost', 
    user: 'shovon', 
    password: '123', 
    database: 'cookbook', 
    connectionLimit: 5
});

db.then(async conn => {
  let result = await conn.query("UPDATE profile SET cats = cats + 1 WHERE name = 'Sybil'");
  
  if(result.affectedRows > 0) {
    console.log("Update successful.");
    console.log(result.affectedRows + " rows updated.");
  } else {
    console.log("Update failed.");
  }

  conn.end();
}).catch(err => {
  console.log("Unable to connect to the database.");
});
