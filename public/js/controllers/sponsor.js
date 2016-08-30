// Flawless

angular.module('myControllers').controller('SponsorController', function (sponsorService) {

  var vm  = this;

  sponsorService.getAll(function(response) {
    vm.sponsors = response.data.data;
  }, function(response) {
    console.log(response);
  });

});
