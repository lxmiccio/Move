angular.module('moveApp', ['angucomplete-alt', 'angularRandomString', 'isteven-multi-select', 'LocalStorageModule', 'ngFileUpload', 'ngRoute', 'ngSanitize', 'ui.bootstrap.datetimepicker', 'myControllers', 'myServices'])

.config(function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('moveApp').setStorageType('localStorage');
})

.config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthHttpInterceptor');
})

.config(function ($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/', {
    templateUrl: 'views/categories.html',
    controller: 'CategoriesController as ctrl'
  }).when('/modifica/categoria/:id', {
    templateUrl: 'views/updateCategory.html',
    controller: 'UpdateCategoryController as ctrl'
  }).when('/modifica/categoria/:id/aggiungi/pr', {
    templateUrl: 'views/addPr.html',
    controller: 'AddPrController as ctrl'
  }).when('/categoria/:id/crea/evento', {
    templateUrl: 'views/createEvent.html',
    controller: 'CreateEventController as ctrl'
  }).when('/categoria/:id', {
    redirectTo: '/categoria/:id/pagina/1'
  }).when('/categoria/:id/pagina/:page', {
    templateUrl: 'views/events.html',
    controller: 'EventsController as ctrl'
  }).when('/modifica/evento/:id', {
    templateUrl: 'views/updateEvent.html',
    controller: 'UpdateEventController as ctrl'
  }).when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController as ctrl'
  }).when('/utente/password/recupera', {
    templateUrl: 'views/recoverPassword.html',
    controller: 'RecoverPasswordController as ctrl'
  }).when('/utente/password/reimposta/:token', {
    templateUrl: 'views/resetPassword.html',
    controller: 'ResetPasswordController as ctrl'
  }).otherwise({
    redirectTo: '/'
  });
})

.run(function($rootScope) {
  $rootScope.$on('$locationChangeStart', function() {
    $rootScope.previous = location.pathname;
  })
})

.factory('AuthHttpInterceptor', function($q, $rootScope, localStorageService, $injector) {
  return {
    request: function(config) {
      config.headers.Authorization = 'Bearer ' + localStorageService.get('token');
      return config;
    },
    response: function(response) {
      console.log('response');
      if(response.headers('Authorization')) {
        console.log(response.headers('Authorization'));
        localStorageService.set('token', response.headers('Authorization'));
      }
      return response;
    },
    responseError: function(rejection) {
      /*if(rejection.status === 401)
      {
        // We're going to get attempt to refresh the token on the server, if we're within the ttl_refresh period.
        var deferred = $q.defer();
        // We inject $http, otherwise we will get a circular ref
        $injector.get('$http').post('http://my-api.com/customer/reissue/token', {}, {
          headers: {
            Authorization: localStorageService.get('token')
          }
        }).then(function(response) {

          // If this request was successful, we will have a new
          // token, so let's put it in storage
          $rootScope.storeAuthToken(response.token);
          // Now let's send the original request again
          $injector.get(“$http”)(response.config)
          .then(function(response) {

            // The repeated request was successful! So let's put
            // this response back to the original workflow
            return deferred.resolve(response);
          }, function() {
            // Something went wrong with this request
            // So we reject the response and carry on with 401
            // error
            $rootScope.$broadcast('auth-logout');
            return deferred.reject();
          })
        }, function() {
          // Refreshing the token failed, so let's carry on with
          // 401
          $rootScope.$broadcast('auth-logout');
          return deferred.reject();
        });
        // Now we continue with the 401 error if we've reached this
        // point
        return deferred.promise;
      }
      return $q.reject(rejection);
      */
    }
  };
});
