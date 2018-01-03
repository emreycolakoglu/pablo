var gulp = require('gulp');
var copy = require('gulp-copy');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');

var tsProject = ts.createProject('tsconfig.json', {
  declaration: true
});

gulp.task('build', function (callback) {
  runSequence('clean', ['scripts'], ['views'], callback);
});

gulp.task('scripts', function () {
  var tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());
  return tsResult.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('views', function () {
  return gulp.src([
    './app/views/*'
  ])
    .pipe(copy('./dist/views/', { prefix: 10 }))
})

gulp.task('clean', function () {
  return gulp.src('./dist/', { read: false })
    .pipe(clean());
});

gulp.task('watch', ['scripts'], function () {
  gulp.watch('app/**/*.ts', ['scripts']);
  gulp.watch('./app/views/*', ['views']);
});