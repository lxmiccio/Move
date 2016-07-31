<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::any('{path?}', function () {
  return File::get(public_path() . '\index.html');
})->where("path", ".+");

/*

Route::get('/', function () {
  return view('index');
});


Route::any('{path?}', function () {
  return File::get(base_path() . '\resources\views\index.blade.php');
})->where("path", ".+");
