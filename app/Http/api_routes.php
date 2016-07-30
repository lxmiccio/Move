<?php

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {

	$api->get('auth/me', 'App\Api\V1\Controllers\AuthController@me');
	$api->get('auth/refresh', 'App\Api\V1\Controllers\AuthController@refresh');
	$api->post('auth/login', 'App\Api\V1\Controllers\AuthController@login');
	$api->post('auth/signup', 'App\Api\V1\Controllers\AuthController@signup');
	$api->post('auth/recovery', 'App\Api\V1\Controllers\AuthController@recovery');
	$api->post('auth/reset', 'App\Api\V1\Controllers\AuthController@reset');

	$api->resource('categories', 'App\Api\V1\Controllers\CategoryController');
	$api->put('categories/{id}/attach/pr', 'App\Api\V1\Controllers\CategoryController@attachPr');
	$api->put('categories/{id}/detach/pr', 'App\Api\V1\Controllers\CategoryController@detachPr');

	$api->resource('events', 'App\Api\V1\Controllers\EventController');

	$api->resource('partecipants', 'App\Api\V1\Controllers\PartecipantController');

	$api->resource('prs', 'App\Api\V1\Controllers\PrController');

	/*$api->group(['middleware' => 'api.auth'], function ($api) {
	$api->get('books', 'App\Api\V1\Controllers\BookController@index');
	$api->get('books/{id}', 'App\Api\V1\Controllers\BookController@show');
	$api->post('books', 'App\Api\V1\Controllers\BookController@store');
	$api->put('books/{id}', 'App\Api\V1\Controllers\BookController@update');
	$api->delete('books/{id}', 'App\Api\V1\Controllers\BookController@destroy');
});*/

});
