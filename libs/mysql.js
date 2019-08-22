const mariadb = require('mariadb');

let DB = {
  credentials: {
    host: 'localhost',
    user: 'shovon',
    password: '123',
    database: 'cookbook'
  },
  dbh: null,
  connected: false,
  connect: () => {
    DB.dbh = mariadb.createConnection(DB.credentials);
    DB.connected = true;
  },
  disconnect: (connection) => {
    if(connection) {
      DB.connected = false;
      connection.end();
    }
  },
  test: function() {
    console.log(this);
  }
};


module.exports = DB;