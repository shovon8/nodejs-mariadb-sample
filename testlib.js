const DB = require('./libs/mysql');


console.log('Start before connect->' + DB.connected);

DB.connect();

console.log('Start after connect ->' + DB.connected);


DB.dbh.then(conn => {
  console.log('DB.dbh.then ->' + DB.connected);

  DB.disconnect(conn);

  console.log('DB.dbh.then, after disconnect ->' + DB.connected);


}).catch(e => {
  console.log("Unable to connect to the database.");
  console.log('DB.dbh.catch ->' + DB.connected);
});



