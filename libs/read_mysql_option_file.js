
const fs = require('fs');
const _ = require('lodash');

let read_mysql_option_file = (filename) => {
  let opt = {};
  let lines = fs.readFileSync(filename).toString().split(/\r?\n/);

  let options = lines.filter(line => {
    if(line.match(/^[#;]/) || line.match(/^$/) || line.match(/^\[/)) return false;

    return true;
  });


  options.forEach(option => {
    option = option.split('=');
    let key = _.trim(option[0]);
    let value = _.trim(option[1]);

    if(value === '') {
      opt[key] = key;
      return;
    }

    opt[key] = value;
  });

  return opt;
};

module.exports = read_mysql_option_file;



// let read_mysql_option_file = (filename, group_list = 'client') => {
//   if(typeof group_list === 'string') {
//     group_list = [group_list];
//   }

//   if(!Array.isArray(group_list)) {
//     return false;
//   }

//   let opt = {};

//   let lines = fs.readFileSync(filename).toString().split(/\r?\n/);

//   let options = lines.filter(line => {
//     if(line.match(/^[#;]/)) { // lines starts with # or ; - comments
//       return false;
//     }

//     if(line.match(/^$/)) { // blank lines
//       return false;
//     }

//     if(line.match(/^\[/)) { // lines start with [
//       return false;
//     }

//     return true;
//   });


//   options.forEach(option => {
//     option = option.split('=');
//     let key = _.trim(option[0]);
//     let value = _.trim(option[1]);

//     if(value === '') {
//       opt[key] = key;
//       return;
//     }

//     opt[key] = value;
//   });

//   return opt;
// };



