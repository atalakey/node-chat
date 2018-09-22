/*
  Moment is a JavaScript date library for parsing,
  validating, manipulating, and formatting dates.

  Visit http://momentjs.com/docs/ to learn more.
*/
const moment = require('moment');

const currentDate = moment();

console.log(currentDate.valueOf());
console.log(currentDate.format('MMM Do, YYYY h:mm a'));

currentDate.add(100, 'years').subtract(9, 'months');

console.log(currentDate.format('MMM Do, YYYY h:mm a'));

// UNIX Epoch time
const date = moment(0);

console.log(date.format('MMM Do, YYYY h:mm:ss a'));
