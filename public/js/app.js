angular.module('moveApp', ['ngFileUpload', 'ngRoute', 'LocalStorageModule', 'myControllers', 'myServices'])

.config(function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('moveApp').setStorageType('localStorage');
})

.config(function ($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/', {
    templateUrl: 'views/categories.html',
    controller: 'CategoriesController as ctrl'
  }).when('/modifica/categoria/:id', {
    templateUrl: 'views/updateCategory.html',
    controller: 'UpdateCategoryController as ctrl'
  }).when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController as ctrl'
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
