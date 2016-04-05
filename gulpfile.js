var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var concat = require('gulp-concat');
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
var wiredep = require('wiredep').stream;
var _ = require('lodash');
var $ = require('gulp-load-plugins')({
    lazy: true
});
var colors = $.util.colors;
var envenv = $.util.env;
var port = process.env.PORT || config.defaultPort;
// BUILD
gulp.task('build', function(cb) {
    gulpSequence(['sass'], 'index', 'scripts', 'javascript', 'wiredep', 'fonts')(cb);
});
// GO PRODUCTION
gulp.task('prod', function(cb) {
    gulpSequence(['minify-css'], 'minify-js')(cb);
});

// CLEAN
gulp.task('clean', function(done) {
    var delconfig = [].concat(config.build, config.temp);
    log('Cleaning: ' + $.util.colors.blue(delconfig));
    del(delconfig, done);
});
// INJECT Styles
gulp.task('index', function() {
    var target = gulp.src(config.layout);
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(config.css, {
        read: false
    });
    return target.pipe(inject(sources))
        .pipe(gulp.dest(config.clientLayout));
});
// INJECT JS
gulp.task('javascript', function() {
    var target = gulp.src(config.js);

    function transformFilepath(filepath) {
        return '<script src="' + filepath + '"' + '></script>';
    }

    var javascriptOptions = {
        transform: transformFilepath,
        addRootSlash: false
    };

    return gulp.src(config.layout)
        .pipe(inject(target, javascriptOptions))
        .pipe(gulp.dest(config.clientLayout));
});
// ScRIPTS
gulp.task('scripts', function(done) {
    return gulp.src(config.js)
        .pipe(concat('application.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.temp), done);
});
gulp.task('minify-js', function(done) {
    return gulp.src(config.minjs)
        .pipe(sourcemaps.init())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.build));
});
// STYLES
gulp.task('sass', function(done) {

    var injectAppFiles = gulp.src('./src/client/styles/styles/**/*.scss', {
        read: false
    });
    var injectGlobalFiles = gulp.src('./src/client/styles/global/**/*.scss', {
        read: false
    });

    function transformFilepath(filepath) {
        return '@import "' + filepath + '";';
    }

    var injectAppOptions = {
        transform: transformFilepath,
        starttag: '// inject:app',
        endtag: '// endinject',
        addRootSlash: false
    };

    var injectGlobalOptions = {
        transform: transformFilepath,
        starttag: '// inject:global',
        endtag: '// endinject',
        addRootSlash: false
    };

    return gulp.src(config.mainscss)
        .pipe(wiredep())
        .pipe(sourcemaps.init())
        .pipe(inject(injectGlobalFiles, injectGlobalOptions))
        .pipe(inject(injectAppFiles, injectAppOptions))
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        // .pipe(csso())
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
// inject bower components
gulp.task('wiredep', function() {
    var bowerOptions = {
        ignorePath: '../../../'
    };
    gulp.src(config.layout)
        .pipe(wiredep(bowerOptions))
        .pipe(gulp.dest(config.clientLayout));
});
// FONTS
/**
 * Copy fonts
 * @return {Stream}
 */
gulp.task('fonts', function() {
    log('Copying fonts');
    return gulp
        .src(config.fonts)
        .pipe(gulp.dest('./fonts'));
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
gulp.task('browserSyncReload', ['sass'], browserSync.reload);
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


    gulp.watch([config.scss, config.js, config.serverJS, config.hbs], ['browserSyncReload'])
        .on('change', changeEvent);


    var options = {
        proxy: 'localhost:' + port,
        port: 3001,
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