//Flawless

angular.module('myControllers').controller('AdministerCategoryController', function (categoryService) {

  var vm = this;

  categoryService.getAll(function(response) {
    vm.categories = response.data.data;
  }, function(response) {
    console.log(response);
  });

});
