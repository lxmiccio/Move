angular.module('myFilters').filter('newLine', function() {
  return function(string) {
    if(string) {
      return string.replace(/\\n\r?/g, '<br />');
    } else {
      return string;
    }
  };
});
