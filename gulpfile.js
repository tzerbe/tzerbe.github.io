var gulp = require('gulp')
var browserify = require('browserify')
var buffer = require('vinyl-buffer');

var source = require('vinyl-source-stream')
var streamify = require('gulp-streamify')
var rename = require('gulp-rename')

var browserifyTask = function() {
  var bundleStream = browserify('./grapher/client.js').bundle()
 
  bundleStream
    .pipe(source('shutup.js'))
    .pipe(buffer())
    .pipe(rename('client.js'))
    .pipe(gulp.dest('./'));
}


gulp.task('default', browserifyTask);

gulp.task('watch', function() {
  gulp.watch('./grapher/*.js', browserifyTask);
});
