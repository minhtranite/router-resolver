'use strict';

var gulp = require('gulp');
var del = require('del');
var eslint = require('gulp-eslint');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var filter = require('gulp-filter');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var runSequence = require('run-sequence');
var webpackStatsHelper = require('./example/webpack-stats-helper');
var path = require('path');
var preProcess = require('gulp-preprocess');
var frep = require('gulp-frep');
var minifyHtml = require('gulp-minify-html');
var webpackStream = require('webpack-stream');
var webpackConfig = require('./webpack.config');
var exampleWebpackConfig = require('./example/webpack.prod.config');
var webpack = require('webpack');

gulp.task('lib:clean', function () {
  del.sync(['lib', 'dist']);
});

gulp.task('lib:lint', function () {
  return gulp
    .src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('lib:babel', function () {
  return gulp
    .src(['src/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('lib:umd', function () {
  return gulp
    .src(['src/index.js'])
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('dist'));
});

gulp.task('lib:sass', function () {
  var cssFilter = filter('**/*.css');
  return gulp
    .src(['src/*.scss', '!src/_*.scss'])
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(cssFilter)
    .pipe(gulp.dest('lib'))
    .pipe(postcss([
      autoprefixer({
        browsers: [
          'ie >= 10',
          'ie_mob >= 10',
          'ff >= 30',
          'chrome >= 34',
          'safari >= 7',
          'opera >= 23',
          'ios >= 7',
          'android >= 4.4',
          'bb >= 10'
        ]
      }),
      cssnano({
        safe: true,
        discardComments: {removeAll: true}
      })
    ]))
    .pipe(gulp.dest('dist'));
});

gulp.task('lib:copy', function () {
  return gulp
    .src(['src/**/*', '!src/**/*.{scss,js}'])
    .pipe(gulp.dest('lib'))
    .pipe(gulp.dest('dist'));
});

gulp.task('lib', function (callback) {
  runSequence('lib:clean', 'lib:lint', 'lib:babel', 'lib:umd', 'lib:sass', 'lib:copy', callback);
});

gulp.task('example:clean', function () {
  del.sync(['example/dist']);
});

gulp.task('example:webpack', function () {
  return gulp
    .src(['example/app/app.js'])
    .pipe(webpackStream(exampleWebpackConfig, webpack))
    .pipe(gulp.dest('example/dist'));
});

gulp.task('example:html', function () {
  var patterns = webpackStatsHelper.getReplacePatterns(path.join(__dirname, './example/dist/webpack.stats.json'));
  return gulp.src(['example/app/*.html'])
    .pipe(preProcess({
      options: {
        srcDir: path.join(__dirname, 'example/app')
      }
    }))
    .pipe(frep(patterns))
    .pipe(minifyHtml())
    .pipe(gulp.dest('example/dist'));
});

gulp.task('example:copy', function () {
  return gulp
    .src(['example/app/*', '!example/app/*.{html,js}'], {nodir: true})
    .pipe(gulp.dest('example/dist'));
});

gulp.task('example', function (callback) {
  runSequence('example:clean', 'example:webpack', 'example:html', 'example:copy', callback);
});

gulp.task('build', function (callback) {
  runSequence('lib', 'example', callback);
});
