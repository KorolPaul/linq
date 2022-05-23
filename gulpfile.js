"use strict"

const gulp = require('gulp'),
      sass = require('gulp-sass')(require('sass')),
      autoprefixer = require('gulp-autoprefixer'),
      browserSync = require('browser-sync'),
      imagemin = require('gulp-imagemin'),
      imageResize = require('gulp-image-resize'),
      cleanCSS = require('gulp-clean-css'),
      uglify = require('gulp-uglify-es').default;

gulp.task('sync', function () {
    browserSync({
        server: {
            baseDir: './'
        },
        notify: false,
        open: true
    });
});

gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

gulp.task('img-resize', function() {
    return gulp.src('src/img/slider/*')
        .pipe(imageResize({
            width : 1500,
            height : 1000,
            crop : false,
            upscale : true
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('img', function() {
    return gulp.src('src/img/*.jpg')
        .pipe(imagemin())
        .pipe(gulp.dest('dist'))
});

gulp.task('minify-css', () => {
    return gulp.src('style.css')
      .pipe(cleanCSS({debug: true, level: 2}, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
      }))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-js', function () {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));;
});

gulp.task('watch', function () {
    gulp.watch(['src/scss/**/*.scss'], gulp.parallel('sass'));
});


gulp.task('default',  gulp.parallel('watch', 'sync'));
