'use strict';

function checkDoubleDigits(number) {
  return new Promise((resolve, reject) => {
    if (number > 10) {
      resolve(`The number: (${number}) is bigger than 10!`);
    } else {
      reject(`Error! The number: (${number}) is smaller than 10...`);
    }
  });
}

checkDoubleDigits(9)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

checkDoubleDigits(11)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
