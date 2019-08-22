// does not work
import readFileSync from 'fs';

let data = readFileSync('../conf/mysql.conf').toString();

console.log(data);