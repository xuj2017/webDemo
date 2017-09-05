const gulp = require('gulp'),
      mocha = require('gulp-mocha'),
      jshint = require('gulp-jshint'),
      exec = require('gulp-exec');

gulp.task('mocha', () =>
    gulp.src('qa/tests-*.js', {ui: 'tdd'})
        .pipe(mocha({reporter: 'nyan'}))
);

gulp.task('jshint',()=>
    gulp.src(['meadowlark.js','public/js/**/*.js','lib/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('YOUR_REPORTER_HERE'))
)