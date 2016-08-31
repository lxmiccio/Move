//Flawless

angular.module('myControllers').controller('CategoriesController', function(categoryService) {

  var vm  = this;

  categoryService.getAll(function(response) {
    vm.categories = [];

    angular.forEach(response.data.data, function(category) {
      vm.categories.push(category);
    });
  }, function(response)  {
    console.log(response);
  });

});
