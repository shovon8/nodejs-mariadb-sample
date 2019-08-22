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
  connection: null,


  connect: async function() {
    try {
      this.connection = await mariadb.createConnection(DB.credentials);
      this.connected = true;
    } catch(err) {
      this.connected = false;
      this.connection = null;
    }
  },

  disconnect: async function() {
    if(this.connection) {
      try {
        await connection.end();
        this.connected = false;
        this.connection = null;
      } catch(e) {}
    }
  },
  
  test: function() {
    console.log(this);
  }
};


module.exports = DB;