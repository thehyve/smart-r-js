const path = require('path');
const gulp = require('gulp');
const del = require('del');

const conf = require('../conf/gulp.conf');

gulp.task('clean', clean);

function clean() {
  return del([conf.paths.dist, conf.paths.tmp]);
}

gulp.task('copy-to-tmp', copyToTmp);

function copyToTmp() {
  return gulp.src([
          conf.path.src('**/*.js'),
          `!${conf.path.src('**/*.spec.js')}`
      ])
      .pipe(gulp.dest(conf.path.tmp()));
}
