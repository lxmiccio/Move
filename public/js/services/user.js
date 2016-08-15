angular.module('myServices').factory('userService', function ($http, localStorageService) {

  function me(onSuccess, onError) {
    if (isAuthenticated()) {
      $http.get('/api/auth/me').then(function(response) {
        onSuccess(response);
      }, function(response) {
        console.log(localStorageService.get('token'))
        localStorageService.remove('token');
          console.log(localStorageService.get('token'))
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
    $http.get('/api/auth/logout').then(function(response) {
      localStorageService.remove('token');
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

  function recoverPassword(data, onSuccess, onError) {
    $http.post('/api/auth/recovery', data).then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  };

  function resetPassword(data, onSuccess, onError) {
    $http.post('/api/auth/reset', data).then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
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
    signup: signup,
    recoverPassword: recoverPassword,
    resetPassword: resetPassword,
    isAuthenticated,
  };

});
