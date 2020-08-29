(function() {
  function addUserToDom(name) {
    const node = document.createElement('li');
    const text = document.createElement(name);
    node.appendChild(text);

    document.getElementById('users').appendChild(node);
  }

  document.getElementById('submit').addEventListener('click', function() {
    // eslint-disable-next-line prefer-const
    let input = document.getElementById('input');
    addUserToDom(input.value);
    input.value = '';
  });

  // eslint-disable-next-line prefer-const
  let users = APP.getUsers;
  for (let i = 0; i < users.length; i++) {
    addUserToDom(users[i]);
  }
})();
