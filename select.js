const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost', 
    user: 'shovon', 
    password: '123', 
    database: 'cookbook', 
    connectionLimit: 5
});

async function asyncFunction() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM limbs;");
    rows.forEach(element => {
        console.log(element);
    });
    // console.log(rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}

asyncFunction();