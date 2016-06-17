var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

 var paths = {
     'jquery': './vendor/bower_components/jquery/',
     'materialize': './vendor/bower_components/Materialize/dist/js/'
 }

elixir(function(mix) {
     mix.sass('app.scss')
      .scripts([
        paths.jquery + "dist/jquery.js",
        paths.materialize + "materialize.js",
        "app.js"
      ], './public/js/app.js')
 });
