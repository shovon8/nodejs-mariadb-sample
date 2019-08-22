const readline = require('readline');
const mariadb = require('mariadb');
const chalk = require('chalk');


const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve, reject) => {
    io.question(question, (input) => {
      resolve(input.toLowerCase());
    });
  });
}

(async function main() {
  let db = await mariadb.createConnection({
    host: 'localhost', 
    user: 'shovon', 
    password: '123', 
    database: 'cookbook',
    connectionLimit: 5
  });

  let action = null;
  let activePage = 1;
  let rowPerPage = 3;
  let result = null;
  let totalPage = 0;  // automatically keep track of total number of pages

  do {
    if(action == 'n') {
      activePage += 1;
    }

    if(activePage > 1 && action == 'p') {
      activePage -= 1;
    }

    
    result = await db.query("SELECT * FROM profile LIMIT ?, ?", [(activePage - 1) * rowPerPage, rowPerPage]);

    // determine total page number automatically
    // by tracking activePage
    // totalPage = max(activePage) when result.length < rowPerPage
    if(result.length == rowPerPage) {
      totalPage = totalPage > activePage ? totalPage : activePage;
    } else if (result.length < rowPerPage && result.length != 0) {
      totalPage = activePage;
    }

    // print rows or check for error
    if(result.length > 0) {
      result.forEach(profile => {
        console.log(profile);
      });
    } else {
      console.log(chalk.blue('No more rows available.'));
    }

    console.log(chalk.blue(`[${activePage}/${totalPage}] `) + chalk.yellow("[n] next | [p] prev | [q] quit\n"));

    // keep activePage to lastPage+1 when the last page is reached
    if(result.length == 0) {
      activePage = totalPage; // reset active page
    }


    action = await ask("> ");

    // fix activePage on prev navigation 
    // when result.length == 0, so that navigation works correctly.
    if(result.length == 0 && action == 'p') {
      activePage = totalPage + 1; // 1 will be negated on next loop
    }
  } while(action != 'q');

  db.end();
  io.close();
})();



