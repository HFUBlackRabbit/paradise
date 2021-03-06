const mix = require('laravel-mix');
require('mix-tailwindcss');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.disableNotifications();
mix
    .js('resources/js/app.js', 'public/js')
    .vue({version: 3});
mix
    .sass('resources/sass/app.scss', 'public/css')
    .tailwind();

mix.copy(
    'node_modules/@fortawesome/fontawesome-free/webfonts',
    'public/webfonts'
);
