const mariadb = require('mariadb');

let db = mariadb.createConnection({
    host: 'localhost', 
    user: 'shovon', 
    password: '1234', 
    database: 'cookbook', 
    connectionLimit: 5
});

db.then(conn => {
  console.log("Connection established.");

  conn.end();
  console.log("Connection closed.");
}).catch(err => {
  console.log("Unable to connect to the database.");
//   console.log(err);
  console.log(err.errno);
  console.log(err.code);
  console.log(err.message);
});
