/*
Exercise 3: Dog photo gallery

Let's make a randomized dog photo gallery!

Write a function that makes a HTTP Request to https://dog.ceo/api/breeds/image/random.

1. It should trigger after clicking a button in your webpage. Every time the button is clicked it should append a new dog image to the DOM.
2. Create an index.html file that will display your random image
3. Add 2 <button> and 1 <ul> element, either in the HTML or through JavaScript
4. Write two versions for the button functionality: one with XMLHttpRequest, and the other with axios
5. When any one of the 2 buttons is clicked it should make a HTTP Request to https://dog.ceo/api/breeds/image/random
6. After receiving the data, append to the <ul> a <li> that contains an <img> element with the dog image
7. Incorporate error handling: log to the console the error message
*/

function getDogPhoto() {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://dog.ceo/api/breeds/image/random', true);
  xhr.onload = function() {
    const response = JSON.parse(xhr.responseText);
    let output = '';
    output += `<img src="${response.message}"><img>`;
    document.getElementById('photos').innerHTML = output;
  };
  xhr.send();
}

function getDogPhotoWithAxios() {
  axios
    .get('https://dog.ceo/api/breeds/image/random')
    .then(response => {
      let output = '';
      output += `<img src="${response.data.message}"><img>`;
      document.getElementById('photos').innerHTML = output;
    })
    .catch(error => console.log(error));
}

document.getElementById('button1').addEventListener('click', getDogPhoto);
document
  .getElementById('button2')
  .addEventListener('click', getDogPhotoWithAxios);
