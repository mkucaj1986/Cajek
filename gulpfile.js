'use strict';

var gulp = require('gulp');

var env = process.env.NODE_ENV || 'development';

var defaultTasks = ['clean', 'jshint', 'csslint', 'serve', 'watch']; // initialize with development settings

// read gulp directory contents for the tasks...
require('require-dir')('./gulp');

gulp.task('default', ['development'], function(defaultTasks) {
    // run with paramater
    gulp.start(env);
});