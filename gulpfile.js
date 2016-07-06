var elixir = require('laravel-elixir');

require('laravel-elixir-vueify');

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
     'tether':'./vendor/bower_components/tether/',
     'bootstrap':'./vendor/bower_components/bootstrap/'
 }

elixir(function(mix) {
     mix.sass('app.scss')
      .scripts([
        paths.jquery + "dist/jquery.js",
        paths.tether + "dist/js/tether.js",
        paths.bootstrap + "dist/js/bootstrap.js",
        "structure.js"
      ], './public/js/lib.js')
      mix.browserify('main.js');
      mix.scripts(
        ['app.js'],
        './public/js/app.js'
        );
 });
