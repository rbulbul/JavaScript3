/*
Exercise 2: Programmer humor

Who knew programmers could be funny?

1. Write a function that makes a HTTP Request to https://xkcd.now.sh/?comic=latest
2. Inside the same file write two programs: one with XMLHttpRequest, and the other with axios
3. Each function should make a HTTP Request to the given endpoint: https://xkcd.now.sh/?comic=latest
4. Log the received data to the console
5. Render the img property into an <img> tag in the DOM
6. Incorporate error handling: log to the console the error message

*/

(function getImage() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://xkcd.now.sh/?comic=latest', true);

  xhr.onerror = () => {
    console.log(`Network error: Failed to connect server.`);
  };

  xhr.onload = function() {
    if (this.status === 200) {
      const data = JSON.parse(this.responseText);
      // Log the receive data
      console.log(data);
      const h1 = document.createElement('h1');
      h1.textContent = 'HTTP Request';
      document.body.appendChild(h1);
      const img = document.createElement('img');
      document.body.appendChild(img);
      img.setAttribute('src', data.img);
    }
  };
  xhr.send();
})();

// ------with axios------

axios({
  method: 'GET',
  url: 'https://xkcd.now.sh/?comic=latest',
})
  .then(response => {
    const h1 = document.createElement('h1');
    h1.textContent = 'Axios';
    document.body.appendChild(h1);
    const img = document.createElement('img');
    document.body.appendChild(img);
    img.setAttribute('src', response.data.img);
  })
  .catch(error => console.error(error));
