/**
 * Copyright (c) 2016 The Hyve B.V.
 * This code is licensed under the GNU General Public License,
 * version 3, or (at your option) any later version.
 */

const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const conf = require('../conf/gulp.conf');
const less = require('gulp-less');
const cssnano = require('gulp-cssnano');

var lessOptions = {
    paths: [
        'bower_components',
        path.join(conf.paths.src)
    ],
    relativeUrls: true
};


function compileCSS() {
    return gulp.src(conf.path.src('**/*.less'))
        .pipe(less(lessOptions))
        .pipe(gulp.dest(path.join(conf.paths.tmp, 'css')));
}

function minifyCSS () {
    return gulp.src(conf.path.tmp('**/*.css'))
        .pipe(concat('smart-r-js.css'))
        .pipe(cssnano())
        .pipe(gulp.dest(conf.path.dist()));
}

gulp.task('styles', gulp.series(compileCSS, minifyCSS));
