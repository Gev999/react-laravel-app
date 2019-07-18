<?php

use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes([ 'register'  =>  false ]);

Route::get('/home', 'HomeController@index')->name('home');

Route::middleware('auth')->group(function(){
    Route::resource('companies', 'CompaniesController');
    Route::resource('employees', 'EmployeesController');
});

Route::get('redirect/{driver}', 'Auth\LoginController@redirectToProvider')
    ->name('login.provider')
    ->where('driver', implode('|', config('auth.socialite.drivers')));

Route::get('{driver}/callback', 'Auth\LoginController@handleProviderCallback')
    ->name('login.callback')
    ->where('driver', implode('|', config('auth.socialite.drivers')));
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
