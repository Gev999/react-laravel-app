<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function () {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('init', 'AuthController@init');
    Route::post('provider/user', 'API\LoginController@handleProviderCallback');

});

Route::group([

    'middleware' => ['api', 'jwt.auth'],

], function() {

    Route::apiResource('companies', 'API\CompaniesController');
    Route::apiResource('employees', 'API\EmployeesController');

});

