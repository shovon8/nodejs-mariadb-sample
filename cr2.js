const mariadb = require('mariadb');

let db = mariadb.createConnection({
    host: 'localhost', 
    user: 'shovon', 
    password: '123', 
    database: 'cookbook', 
    connectionLimit: 5
});

db.then(async (conn) => {
  console.log("Connection established.");

  let result = await conn.query("DROP TABLE IF EXISTS users");
  console.log(result);
  
  result = await conn.query("CREATE TABLE users (username VARCHAR(10), password VARCHAR(20))");
  console.log(result);

  let users = [{name: 'shovon', pass: '12dav'}, {name: 'sharmin', pass: '5asd4'}];
  
  users.forEach(async (user) => {
    let r = await conn.query("INSERT INTO users VALUES(?, ?)", [user.name, user.pass]);
    console.log(r);    
  });
  
  result = await conn.query("SELECT * FROM users");
  console.log(result);

  conn.end();
  console.log("Connection closed.");
}).catch(err => {
  console.log("Unable to connect to the database.");
});
