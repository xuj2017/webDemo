var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify'); 
var sourcemaps =require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('babel',function(){
    return gulp.src('src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
})

gulp.task('sass',function(){
    return gulp.src('src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
        .pipe(autoprefixer({
          	browers:['last 2 versions','ie >= 8.0','iOS >= 7','Android >= 4.0'],
          	cascade:true,
         }))
        .pipe(gulp.dest('dist/css'));
})

gulp.task('watch',function(){
    gulp.watch('src/scss/*.scss',function(ev){
        gulp.start('sass');
    });
    gulp.watch('src/js/*.js',function(ev){
        gulp.start('babel');
    })
})

gulp.task('default',function () {
    
})

