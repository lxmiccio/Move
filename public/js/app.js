angular.module('moveApp', ['angucomplete-alt', 'angularRandomString', 'isteven-multi-select', 'LocalStorageModule', 'ngFileUpload', 'ngRoute', 'ngSanitize', 'ui.bootstrap.datetimepicker', 'myControllers', 'myFilters', 'myServices'])

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
  }).when('/categoria/:id/modifica', {
    templateUrl: 'views/updateCategory.html',
    controller: 'UpdateCategoryController as ctrl'
  }).when('/categoria/:id/crea/evento', {
    templateUrl: 'views/createEvent.html',
    controller: 'CreateEventController as ctrl'
  }).when('/categoria/:id', {
    redirectTo: '/categoria/:id/pagina/1'
  }).when('/categoria/:id/pagina/:page', {
    templateUrl: 'views/events.html',
    controller: 'EventsController as ctrl'
  }).when('/evento/:id/modifica', {
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

.factory('AuthHttpInterceptor', function(localStorageService) {
  return {
    request: function(config) {
      config.headers.Authorization = localStorageService.get('token');
      return config;
    },
    response: function(response) {
      if(response.headers('Authorization')) {
        localStorageService.set('token', response.headers('Authorization'));
      }
      return response;
    },
    responseError: function(response) {
      return response;
    }
  };
});
