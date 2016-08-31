angular.module('myFilters').filter('removeEscape', function() {
  return function(string) {
    if(string) {
      return string.replace(/\\\"/g,"\"");
    }
  }
});
