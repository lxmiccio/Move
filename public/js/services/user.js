angular.module('myServices').factory('userService', function ($http, localStorageService) {

  function me(onSuccess, onError) {
    if(isAuthenticated()) {
      $http.get('/api/auth/me').then(function(response) {
        onSuccess(response);
      }, function(response) {
        localStorageService.remove('token');
        onError(response);
      });
    }
  };

  function login(data, onSuccess, onError) {
    $http.post('/api/auth/login', data).then(function(response) {
      localStorageService.set('token', 'Bearer ' + response.data.token);
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  };

  function logout(onSuccess, onError) {
    if(isAuthenticated()) {
      $http.get('/api/auth/logout').then(function(response) {
        localStorageService.remove('token');
        onSuccess(response);
      }, function(response) {
        onError(response);
      });
    }
  };

  function isAuthenticated() {
    if(localStorageService.get('token')) {
      return true;
    } else {
      return false;
    }
  };

  return {
    me: me,
    login: login,
    logout: logout,
    isAuthenticated,
  };

});
