var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var glob = require('glob');
var gulp = require('gulp');
var path = require('path');
var rev = require('gulp-rev');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var _ = require('lodash');
var $ = require('gulp-load-plugins')({
    lazy: true
});

var colors = $.util.colors;
var envenv = $.util.env;
var port = process.env.PORT || config.defaultPort;

// BUILD
gulp.task('build', ['clean', 'sass'], function() {

});

// GO PRODUCTION
gulp.task('prod', ['minify-css'], function() {

});

// START SERVER
gulp.task('serve-dev', ['clean', 'sass', 'inject'], function() {
    serve(true /*isDev*/ );
});

// CLEAN
gulp.task('clean', function(done) {
    var delconfig = [].concat(config.build, config.temp);
    log('Cleaning: ' + $.util.colors.blue(delconfig));
    del(delconfig, done);
});

// SYLES
gulp.task('sass', function() {
    return gulp.src(config.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.temp));
});

gulp.task('minify-css', function() {
    return gulp.src(config.css)
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(rev())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.build));
});


gulp.task('inject', ['saas'], function() {
    log('Wire up css into the html, after files are ready');

    return gulp
        .src(config.index)
        .pipe(inject(config.css))
        .pipe(gulp.dest(config.client));
});

// ALL GULP FUNCTIONS
function serve(isDev, specRunner) {
    var debug = args.debug || args.debugBrk;
    var debugMode = args.debug ? '--debug' : args.debugBrk ? '--debug-brk' : '';
    var nodeOptions = getNodeOptions(isDev);

    if (debug) {
        runNodeInspector();
        nodeOptions.nodeArgs = [debugMode + '=5858'];
    }

    if (args.verbose) {
        console.log(nodeOptions);
    }

    return $.nodemon(nodeOptions)
        .on('restart', ['vet'], function(ev) {
            log('*** nodemon restarted');
            log('files changed:\n' + ev);
            setTimeout(function() {
                browserSync.notify('reloading now ...');
                browserSync.reload({
                    stream: false
                });
            }, config.browserReloadDelay);
        })
        .on('start', function() {
            log('*** nodemon started');
            startBrowserSync(isDev, specRunner);
        })
        .on('crash', function() {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function() {
            log('*** nodemon exited cleanly');
        });
}

function getNodeOptions(isDev) {
    return {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };
}

function runNodeInspector() {
    log('Running node-inspector.');
    log('Browse to http://localhost:8080/debug?port=5858');
    var exec = require('child_process').exec;
    exec('node-inspector');
}
/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

module.exports = gulp;