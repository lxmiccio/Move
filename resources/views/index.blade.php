<!DOCTYPE html>
<html lang="it" ng-app="moveApp" ng-controller="IndexController as index">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Move</title>

  <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <link href="bower_components/angular-bootstrap-datetimepicker/src/css/datetimepicker.css" rel="stylesheet"/>

  <link href="http://fonts.googleapis.com/css?family=Sniglet" rel="stylesheet"/>

  <link href="css/body.css" rel="stylesheet"/>
  <link href="css/breaks.css" rel="stylesheet"/>
  <link href="css/footer.css" rel="stylesheet"/>
  <link href="css/header.css" rel="stylesheet"/>

  <script src="bower_components/jquery/dist/jquery.min.js"></script>
  <script src="bower_components/angular/angular.min.js"></script>
  <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
  <script src="bower_components/lodash/dist/lodash.min.js"></script>
  <script src="bower_components/moment/min/moment.min.js"></script>
  <script src="bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.js"></script>
  <script src="bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.templates.js"></script>
  <script src="bower_components/angular-local-storage/dist/angular-local-storage.min.js"></script>
  <script src="bower_components/angular-route/angular-route.min.js"></script>
  <script src="bower_components/ng-file-upload/ng-file-upload-shim.min.js"></script>
  <script src="bower_components/ng-file-upload/ng-file-upload.min.js"></script>

  <script src="js/app.js"></script>

  <script src="js/controllers/module.js"></script>
  <script src="js/controllers/categories.js"></script>
  <script src="js/controllers/index.js"></script>

  <script src="js/services/module.js"></script>
  <script src="js/services/category.js"></script>
  <script src="js/services/counter.js"></script>
  <script src="js/services/event.js"></script>
  <script src="js/services/partecipant.js"></script>
  <script src="js/services/pr.js"></script>
  <script src="js/services/user.js"></script>
</head>

<body>
  <header id="header" class="navbar-inverse">
    <div class="container">
      <div class="navbar-header ">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-1">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/#/">
          <img src="https://placeholdit.imgix.net/~text?txtsize=25&txt=300%C3%97100&w=400&h=100" alt="" class="img-responsive img-rounded">
        </a>
      </div>
      <nav class="collapse navbar-collapse" id="navbar-collapse-1">
        <ul class="nav navbar-nav navbar-right">
          <li><a href="/#/">Home</a></li>
          <li><a href="">Login</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <div class="container">
    <div class="row br-lg"></div>

    <div ng-view></div>

    <div class="row br-lg"></div>
  </div>

  <footer class="footer-inverse">
    <div class="container">
      <p class="text-center">Visitatori: @{{index.counter.visitors}}</p>
    </div>
  </footer>
</body>
</html>
