const readline = require('readline');

const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve, reject) => {
    io.question(question, (input) => {
      resolve(input);
    });
  });
}

(async function main() {
  let username = await ask("Username: ");
  let password = await ask("Password: ");
  
  console.log(username, password);

  io.close();
})();



