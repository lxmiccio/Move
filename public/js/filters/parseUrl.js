angular.module('myFilters').filter('parseUrl', function() {
  var urls = /(\b(https?|ftp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim;
  // var emails = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;

  return function(string) {
    if(string) {
      if(string.match(urls)) {
        string = string.replace(urls, "<a href=\"$1\" target=\"_blank\">$1</a>");
      }
      // if(string.match(emails)) {
      //   string = string.replace(emails, "<a href=\"mailto:$1\">$1</a>");
      // }

      return string.replace(/\\\"/g,"\"");
    } else {
      return string;
    }
  }
});
