var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var glob = require('glob');
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var path = require('path');
var inject = require('gulp-inject');
var rev = require('gulp-rev');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
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
gulp.task('build', function(cb) {
    gulpSequence(['sass'], 'index')(cb);
});
// GO PRODUCTION
gulp.task('prod', ['minify-css'], function() {});
// CLEAN
gulp.task('clean', function(done) {
    var delconfig = [].concat(config.build, config.temp);
    log('Cleaning: ' + $.util.colors.blue(delconfig));
    del(delconfig, done);
});
// INJECT
gulp.task('index', function() {
    var target = gulp.src(config.layout);
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(config.css, {
        read: false
    });
    return target.pipe(inject(sources))
        .pipe(gulp.dest(config.clientLayout));
});
// STYLES
gulp.task('sass', function(done) {
    return gulp.src(config.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.temp), done);
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
// START SERVER
gulp.task('dev', ['build'], function() {
    serve(true /*isDev*/ );
});
// ALL GULP FUNCTIONS
function serve(isDev) {
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
            startBrowserSync(isDev);
        })
        .on('crash', function() {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function() {
            log('*** nodemon exited cleanly');
        });
}
/**
 * Optimize the code and re-load browserSync
 */
gulp.task('browserSyncReload', function(cb) {
    gulpSequence(['sass'], 'index', browserSync.reload)(cb);
});
/**
 * When files change, log it
 * @param  {Object} event - event that fired
 */
function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}
/**
 * Start BrowserSync
 * --nosync will avoid browserSync
 */
function startBrowserSync(isDev, specRunner) {
    if (args.nosync || browserSync.active) {
        return;
    }

    log('Starting BrowserSync on port ' + port);

    // If build: watches the files, builds, and restarts browser-sync.
    // If dev: watches less, compiles it to css, browser-sync handles reload
    if (isDev) {
        log('watch dev');
        gulp.watch([config.scss, config.js, config.serverJS, config.hbs], ['browserSyncReload'])
            .on('change', changeEvent);
    } else {
        gulp.watch([config.scss, ], ['browserSyncReload'])
            .on('change', changeEvent);
    }

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: isDev ? [
            config.client + '**/*.*',
            '!' + config.scss,
            config.temp + '**/*.css'
        ] : [],
        ghostMode: { // these are the defaults t,f,t,t
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0 //1000
    };

    browserSync(options);
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