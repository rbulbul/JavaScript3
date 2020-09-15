'use strict';

const getAnonName = (firstName) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (firstName) {
        resolve(`${firstName} Doe`);
      } else {
        reject("You didn't pass in a first name!");
      }
    }, 2000);
  });
};

function handleSuccess(value) {
  console.log(value);
}

function handleFailure(err) {
  console.log(err);
}

getAnonName('John').then(handleSuccess).catch(handleFailure);
