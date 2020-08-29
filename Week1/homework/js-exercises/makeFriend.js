'use strict';

/*
Exercise 1: Who do we have here?

Wouldn't it cool to make a new friend with just the click of a button?

1. Write a function that makes a HTTP Request to https://www.randomuser.me/api
2. Inside the JavaScript file write two functions: one with XMLHttpRequest, and the other with axios
3. Each function should make a HTTP Request to the given endpoint: https://www.randomuser.me/api
4. Log the received data to the console
5. Incorporate error handling: log to the console the error message
*/

// XML Http request
function getFriend() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.randomuser.me/api', true);

  xhr.onerror = () => {
    console.log('Some Error');
  };

  xhr.onload = function() {
    if (this.status === 200) {
      const friend = JSON.parse(this.responseText);
      // Log the receive data
      console.log(friend);

      let output = '';
      output += `<div class="user">
      <img src="${friend.results[0].picture.medium}">
      <ul><li> Name: ${friend.results[0].name.first} ${friend.results[0].name.last}<li>
      <li>Email: ${friend.results[0].email}</li></ul></div>`;
      document.getElementById('user').innerHTML = output;
    }
  };
  xhr.send();
}

const getFriendAxios = () => {
  axios
    .get('https://www.randomuser.me/api')
    .then(response => {
      let output = '';
      output += `<div class="user">
      <img src="${response.data.results[0].picture.medium}">
      <ul><li> Name: ${response.data.results[0].name.first} ${response.data.results[0].name.last}<li>
      <li>Email: ${response.data.results[0].email}</li></ul></div>`;
      document.getElementById('user').innerHTML = output;
      console.log(response.data);
    })
    .catch(error => console.log(error));
};

document.getElementById('button1').addEventListener('click', getFriend);
document.getElementById('button2').addEventListener('click', getFriendAxios);
