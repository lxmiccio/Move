angular.module("myServices").factory("classroomService", function ($http, userService) {

	function getAll(onSuccess, onError) {
		
		$http.get('api/classrooms').then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
		
	};

	function getById(id, onSuccess, onError) {

		$http.get('api/classrooms/' + id).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};

	function create(data, onSuccess, onError) {

		$http.post('api/classrooms?token=' + userService.getToken(), data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};

	function update(id, data, onSuccess, onError) {

		$http.put('api/classrooms/' + id + '?token=' + userService.getToken(), data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};

	function remove(id, onSuccess, onError) {
		
		$http.delete('api/classrooms/' + id + '?token=' + userService.getToken()).then(function() {
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
