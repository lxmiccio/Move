angular.module('moveApp', ['ngRoute', 'LocalStorageModule', 'myServices'])

.config(function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('moveApp').setStorageType('localStorage');
})

.config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/index.html',
    //controller: 'IndexController as index'
  })/*.when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LoginController as ctrl'
  }).when('/', {
    templateUrl: 'partials/index.html',
    controller: 'MainController'
  })*/.otherwise({
    redirectTo: '/'
  });
});
