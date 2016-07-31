angular.module('myServices').factory('partecipantService', function ($http, userService) {

	function getAll(onSuccess, onError) {

		$http.get('api/partecipants').then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};

	function getById(id, onSuccess, onError) {

		$http.get('api/partecipants/' + id).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};

	function create(data, onSuccess, onError) {

		$http.post('api/partecipants?token=' + userService.getToken(), data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};

	function update(id, data, onSuccess, onError) {

		$http.put('api/partecipants/' + id + '?token=' + userService.getToken(), data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};

	function remove(id, onSuccess, onError) {

		$http.delete('api/partecipants/' + id + '?token=' + userService.getToken()).then(function() {
			onSuccess();
		}, function(response){
			onError(response);
		});

	};

	return {
		getAll: getAll,
		getById: getById,
		create: create,
		update: update,
		remove: remove
	};

});
