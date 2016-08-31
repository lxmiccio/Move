angular.module('moveApp', ['angucomplete-alt', 'angular-jwt', 'angularRandomString', 'btford.socket-io', 'isteven-multi-select', 'LocalStorageModule', 'ngFileUpload', 'ngRoute', 'ngSanitize', 'ui.bootstrap.datetimepicker', 'myControllers', 'myFilters', 'myServices'])

.config(function ($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/', {
    templateUrl: 'views/categories.html',
    controller: 'CategoriesController as ctrl'
  }).when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController as ctrl'
  }).when('/amministrazione', {
    templateUrl: 'views/administration.html'
  }).when('/amministrazione/categorie', {
    templateUrl: 'views/administerCategory.html',
    controller: 'AdministerCategoryController as ctrl'
  }).when('/amministrazione/categoria/:id/modifica', {
    templateUrl: 'views/updateCategory.html',
    controller: 'UpdateCategoryController as ctrl'
  }).when('/amministrazione/categoria/:id/crea/evento', {
    templateUrl: 'views/createEvent.html',
    controller: 'CreateEventController as ctrl'
  }).when('/amministrazione/evento/:id/modifica', {
    templateUrl: 'views/updateEvent.html',
    controller: 'UpdateEventController as ctrl'
  }).when('/amministrazione/dj', {
    templateUrl: 'views/administerDj.html',
    controller: 'AdministerDjController as ctrl'
  }).when('/amministrazione/dj/:id/modifica', {
    templateUrl: 'views/updateDj.html',
    controller: 'UpdateDjController as ctrl'
  }).when('/amministrazione/log', {
    templateUrl: 'views/administerLog.html',
    controller: 'AdministerLogController as ctrl'
  }).when('/amministrazione/pr', {
    templateUrl: 'views/administerPr.html',
    controller: 'AdministerPrController as ctrl'
  }).when('/amministrazione/pr/:id/modifica', {
    templateUrl: 'views/updatePr.html',
    controller: 'UpdatePrController as ctrl'
  }).when('/amministrazione/sponsor', {
    templateUrl: 'views/administerSponsor.html',
    controller: 'AdministerSponsorController as ctrl'
  }).when('/amministrazione/sponsor/:id/modifica', {
    templateUrl: 'views/updateSponsor.html',
    controller: 'UpdateSponsorController as ctrl'
  }).when('/categoria/:id', {
    templateUrl: 'views/event.html',
    controller: 'EventController as ctrl'
  }).when('/categoria/:id/pagina/:page', {
    templateUrl: 'views/events.html',
    controller: 'EventsController as ctrl'
  }).when('/dj', {
    templateUrl: 'views/djs.html',
    controller: 'DjsController as ctrl'
  }).when('/dj/:id', {
    templateUrl: 'views/dj.html',
    controller: 'DjController as ctrl'
  }).when('/sponsor', {
    templateUrl: 'views/sponsors.html',
    controller: 'SponsorsController as ctrl'
  }).otherwise({
    redirectTo: '/'
  });
})

.config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthHttpInterceptor');
})

.factory('AuthHttpInterceptor', function(localStorageService) {
  return {
    request: function(config) {
      config.headers.Authorization = localStorageService.get('token');
      return config;
    },
    // response: function(response) {
    //   if(response.headers('Authorization')) {
    //     localStorageService.set('token', response.headers('Authorization'));
    //   }
    //   return response;
    // },
    // responseError: function(response) {
    //   return response;
    // }
  };
})

.config(function($httpProvider, jwtInterceptorProvider) {
  jwtInterceptorProvider.refreshToken = function($http, jwtHelper, localStorageService) {
    var token = localStorageService.get('token');

    if(token) {
      if(jwtHelper.isTokenExpired(token)) {
        return $http.get('api/auth/refresh').then(function(response) {
          localStorageService.set('token', response.data.token);
          return localStorageService.get('token');
        }, function(response) {
          token = localStorageService.get('token');
          if(!jwtHelper.isTokenExpired(token)) {
            return localStorageService.get('token');
          } else {
            localStorageService.remove('token');
          }
        });
      } else {
        return token;
      }
    }
  }

  $httpProvider.interceptors.push('jwtInterceptor');
})

.config(function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('moveApp').setStorageType('localStorage');
})

.run(function($rootScope) {
  // $rootScope.$on('$locationChangeStart', function() {
  //   $rootScope.previous = location.pathname;
  // });
});
