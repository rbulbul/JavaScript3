'use strict';

const COMM = (function() {
  let greet = 'Hello ';

  const getGreet = function() {
    const d = new Date();
    if (d.toLocaleDateString().includes('AM')) {
      greet = 'Good Morning ';
    } else {
      greet = 'Hello';
    }
    return greet;
  };
  const greeting = function(name) {
    console.log(`${getGreet() + name}! Welcome to the course.`);
  };

  // Public Methods and Properties
  return {
    greetUser: greeting,
  };
})();
