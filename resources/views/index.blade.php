<!DOCTYPE html>
<html lang="it" ng-app="moveApp">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Move</title>

  <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <link href="bower_components/angular-bootstrap-datetimepicker/src/css/datetimepicker.css" rel="stylesheet"/>

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

  <script src="js/controllers.js"></script>

  <script src="js/services/category.js"></script>
  <script src="js/services/event.js"></script>
  <script src="js/services/module.js"></script>
  <script src="js/services/partecipants.js"></script>
  <script src="js/services/pr.js"></script>
  <script src="js/services/user.js"></script>
</head>

<body>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1>Book Wishlist Application</h1>
      </div>
    </div>

    <div ng-view></div>
  </div>
</body>
</html>
