angular.module("myServices").factory("topicService", function ($http, userService) {

	function getAll(onSuccess, onError) {
		
		$http.get('api/items').then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});
		
	};

	function getById(id, onSuccess, onError) {

		$http.get('api/topics/' + id).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};

	function create(data, onSuccess, onError) {

		$http.post('api/topics?token=' + userService.getToken(), data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};

	function update(id, data, onSuccess, onError) {

		$http.put('api/topics/' + id + '?token=' + userService.getToken(), data).then(function(response) {
			onSuccess(response);
		}, function(response) {
			onError(response);
		});

	};

	function remove(id, onSuccess, onError) {
		
		$http.delete('api/topics/' + id + '?token=' + userService.getToken()).then(function() {
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
