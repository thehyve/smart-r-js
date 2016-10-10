/**
 * Copyright (c) 2016 The Hyve B.V.
 * This code is licensed under the GNU General Public License,
 * version 3, or (at your option) any later version.
 */

'use strict';

const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const conf = require('./conf/gulp.conf');

// Load some files into the registry
const hub = new HubRegistry([conf.path.tasks('*.js')]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);

gulp.task('test', gulp.series('scripts', 'karma:single-run'));
gulp.task('build', gulp.series('clean', 'partials', 'copy-to-tmp', 'build'));
