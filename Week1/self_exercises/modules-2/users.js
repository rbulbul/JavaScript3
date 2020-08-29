(function() {
  // eslint-disable-next-line prefer-const
  let users = ['Tyler', 'Sarah', 'Dan'];

  function getUsers() {
    return users;
  }

  APP.getUsers = getUsers();
})();
