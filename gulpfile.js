var autoprefixer       = require('gulp-autoprefixer');
var beeper             = require('beeper');
var browserSync        = require('browser-sync');
var gulp               = require('gulp');
var gutil              = require('gulp-util');
var notify             = require('gulp-notify');
var plumber            = require('gulp-plumber');
var pug                = require('gulp-pug');
var sass               = require('gulp-sass');

var onError            = function(err) { // Custom error msg with beep sound and text color
    notify.onError({
      title:    "Gulp error in " + err.plugin,
      message:  err.toString()
    })(err);
    beeper(3);
    this.emit('end');
    gutil.log(gutil.colors.red(err));
};


gulp.task('styles', function() {
  gulp.src('sources/styles/main.scss')
  .pipe(plumber({ errorHandler: onError }))
  .pipe(sass({indentedSyntax: true}))
  .pipe(autoprefixer({
    browsers: ['last 5 versions'],
    cascade: true}))
  .pipe(gulp.dest('build/css'));
});

gulp.task('templates', function() {
  gulp.src('sources/*.pug')
  .pipe(plumber({ errorHandler: onError }))
  .pipe(pug())
  .pipe(gulp.dest('build/'));
});

gulp.task('scripts', function() {
  gulp.src('sources/scripts/**/*.js')
  .pipe(plumber({ errorHandler: onError }))
  .pipe(gulp.dest('build/scripts'));
});

gulp.task('assets', function() {
  gulp.src('sources/assets/**/*')
  .pipe(gulp.dest('build/assets/'));
});

gulp.task('default', function() {
  console.log("Use 'gulp setup' command to initialize the project files");
});

gulp.task('setup', function() {
  gulp.start('styles', 'templates', 'scripts', 'assets');
});

gulp.task('watch', function() {
  gulp.watch('sources/styles/**/*',                               ['styles']);
  gulp.watch(['sources/*.pug', 'sources/templates/**/*.pug'],     ['templates']);
  gulp.watch('sources/scripts/*.js',                              ['scripts']);
  gulp.watch('sources/assets/**/*',                               ['assets']);

  // init server
  browserSync.init({
    server: {
      proxy: "local.build",
      baseDir: "build/"
    }
  });

  gulp.watch(['build/**'], browserSync.reload);
});
