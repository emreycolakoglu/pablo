var gulp = require('gulp');
var copy = require('gulp-copy');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('build', function (callback) {
  runSequence('clean', ['typescript'], ['views'], ['panel'], callback);
});

gulp.task('typescript', function () {
  var tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());
  return tsResult.js
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest('dist'));
});

gulp.task('views', function () {
  return gulp.src([
    './app/views/*'
  ])
    .pipe(copy('./dist/views/', { prefix: 10 }))
});

gulp.task('panel', function () {
  return gulp.src([
    './panel/**/*'
  ]).pipe(copy('./dist/panel', { prefix: 1 }))
});

gulp.task('clean', function () {
  return gulp.src('./dist/', { read: false })
    .pipe(clean());
});

gulp.task('watch', ['build'], function () {
  gulp.watch('app/**/*.ts', ['typescript']);
  gulp.watch('./app/views/*', ['views']);
  gulp.watch('./panel/**/*', ['panel']);
});