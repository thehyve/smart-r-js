/**
 * Copyright (c) 2016 The Hyve B.V.
 * This code is licensed under the GNU General Public License,
 * version 3, or (at your option) any later version.
 */

const conf = require('./gulp.conf');
const listFiles = require('./karma-files.conf');

module.exports = function (config) {
    const configuration = {
        basePath: '../',
        singleRun: true,
        autoWatch: false,
        logLevel: 'INFO',
        junitReporter: {
            outputDir: 'test-reports'
        },
        browsers: [
            'PhantomJS'
        ],
        frameworks: [
            'phantomjs-shim',
            'jasmine',
            'angular-filesort'
        ],
        files: listFiles(),
        preprocessors: {
            [conf.path.src('**/*.html')]: [
                'ng-html2js'
            ]
        },
        ngHtml2JsPreprocessor: {
            stripPrefix: `${conf.paths.src}/`,
            moduleName: 'myTemplates'
        },
        angularFilesort: {
            whitelist: [
                conf.path.tmp('**/!(*.html|*.spec|*.mock).js')
            ]
        },
        plugins: [
            require('karma-jasmine'),
            require('karma-junit-reporter'),
            require('karma-coverage'),
            require('karma-phantomjs-launcher'),
            require('karma-phantomjs-shim'),
            require('karma-ng-html2js-preprocessor'),
            require('karma-angular-filesort')
        ]
    };

    config.set(configuration);
};

