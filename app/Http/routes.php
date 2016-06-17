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
Route::get('welcome', function () {
    return view('welcome');
});
Route::group(['middleware' => ['web']], function () {
    Route::auth();

    Route::get('/admin/dash', 'DashController@index');


    Route::get('/', 'HomeController@index');
    Route::get('/home', 'HomeController@index');

    Route::get('sites', 'SiteController@index');
    Route::get('sites/{sites}', 'SiteController@show');
    Route::post('sites','SiteController@store');
    Route::patch('sites/{sites}', 'SiteController@update');
    Route::delete('sites/{sites}', 'SiteController@destroy');

    Route::get('users', 'UserController@index');
    Route::get('users/{users}', 'UserController@show');
    Route::post('user', 'UserController@store');
    Route::patch('users/{users}', 'UserController@update');
    Route::delete('users/{users}', 'UserController@destroy');

    Route::get('groups', 'GroupController@index');
    Route::get('groups/{groups}', 'GroupController@show');
    Route::post('groups', 'GroupController@store');
    Route::patch('groups/{groups}', 'GroupController@update');
    Route::delete('groups/{groups}', 'GroupController@destroy');

    Route::get('permissions', 'PermissionController@index');
    Route::get('permissions/{permissions}', 'PermissionController@show');
    Route::post('permissions', 'PermissionController@store');
    Route::patch('permissions/{permissions}', 'PermissionController@update');
    Route::delete('permissions/{permissions}', 'PermissionController@destroy');

    Route::get('permissions', 'PermissionController@index');
    Route::get('permissions/{permissions}', 'PermissionController@show');
    Route::post('permissions', 'PermissionController@store');
    Route::patch('permissions/{permissions}', 'PermissionController@update');
    Route::delete('permissions/{permissions}', 'PermissionController@destroy');

    Route::get('articles', 'ArticleController@index');
    Route::get('articles/{articles}', 'ArticleController@show');
    Route::post('groups/{groups}/articles', 'ArticleController@store');
    Route::post('articles/{articles}', 'ArticleController@update');
    Route::delete('articles/{articles}', 'ArticleController@destroy');

    Route::get('notifications', 'NotificationController@index');
    Route::get('notifications/{notifications}', 'NotificationController@show');
    Route::post('notifications', 'NotificationController@store');
    Route::patch('notifications/{notifications}', 'NotificationController@update');
    Route::delete('notifications/{notifications}', 'NotificationController@destroy');
});
