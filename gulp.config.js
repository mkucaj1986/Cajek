module.exports = function() {
    var client = './src/client/';
    var clientApp = client + 'app/';
    var server = './src/server/';
    var temp = './.tmp/';
    var wiredep = require('wiredep');
    var bower = {
        json: require('./bower.json'),
        directory: './bower_components/',
        ignorePath: '../..'
    };
    var nodeModules = 'node_modules';

    var config = {

        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        build: './build/',
        buildSrc: './temp/src/',
        client: client,
        clientLayout: client + 'views/',
        css: temp + 'main.css',
        minjs: temp + 'application.js',
        fonts: bower.directory + 'font-awesome/fonts/**/*.*',
        hbs: client + '**/*.hbs',
        hbstemplates: clientApp + '**/*.hbs',
        images: client + 'images/**/*.*',
        index: client + 'index.hbs',
        layout: client + 'views/layout.hbs',
        // app js, with no specs
        js: [
            client + '**/*.js'
        ],
        scss: client + 'styles/**/*.scss',
        mainscss: client + 'styles/main.scss',
        root: root,
        server: server,
        serverJS: server + '**/*.js',
        source: 'src/',
        sourceCopy: 'src/**',
        temp: temp,
        /**
         * browser sync
         */
        browserReloadDelay: 1000,

        /**
         * Node settings
         */
        nodeServer: './src/server/app.js',
        defaultPort: '3000'

    };
    return config;
};