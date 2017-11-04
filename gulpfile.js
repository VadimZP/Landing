'use strict';

const gulp = require("gulp");
const sass = require("gulp-sass");
const sassImport = require("gulp-sass-import");
const browserSync = require("browser-sync");
const autoprefixer = require("gulp-autoprefixer");
const plumber = require('gulp-plumber');

gulp.task("sass", function () {
    return gulp.src("./sass/**/*.scss")
        .pipe(sassImport({
            filename: '_file',
            marker: './*'
        }))
        .pipe(plumber())
        .pipe(sass({
            errLogToConsole: true
        }))
        .on('error', catchErr)
        .pipe(autoprefixer())

        .pipe(gulp.dest("./css"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

function catchErr(e) {
    console.log(e);
    this.emit('end');
}

gulp.task("browser-sync", function () {
    browserSync({
        server: {
            baseDir: "./",
        },
        notify: false
    })
});

gulp.task("watch", ["browser-sync", "sass"], function () {
    gulp.watch("./*.html", browserSync.reload);
    gulp.watch("./sass/**/*.scss", ["sass"]);
});