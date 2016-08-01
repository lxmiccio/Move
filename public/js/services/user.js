angular.module('myServices').factory('userService', function ($http, localStorageService) {

  function me(onSuccess, onError) {

    if (isAuthenticated()) {
      $http.get('/api/auth/me?token=' + getToken()).then(function(response) {
        onSuccess(response);
      }, function(response) {
        onError(response);
      });
    }

  };

  function refresh(onSuccess, onError) {

    if (isAuthenticated()) {
      $http.get('/api/auth/refresh?token=' + getToken()).then(function(response) {
        onSuccess(response);
      }, function(response) {
        onError(response);
      });
    }

  };

  function logout(onSuccess, onError) {

    $http.get('/api/auth/logout?token=' + getToken()).then(function(response) {
      localStorageService.remove('token');
      onSuccess(response);
    }, function(response) {
      localStorageService.remove('token');
      onError(response);
    });

  };

  function login(data, onSuccess, onError) {

    $http.post('/api/auth/login', data).then(function(response) {
      localStorageService.set('token', response.data.token);
      onSuccess(response);
    }, function(response) {
      onError(response);
    });

  };

  function signup(data, onSuccess, onError) {

    $http.post('/api/auth/signup', data).then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });

  };

  function getToken() {

    return localStorageService.get('token');

  };

  function isAuthenticated() {

    if (localStorageService.get('token')) {
      return true;
    }
    else {
      return false;
    }
  };

  return {
    me: me,
    refresh: refresh,
    logout: logout,
    login: login,
    signup: signup,
    getToken: getToken,
    isAuthenticated,
  };

});
