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
        client: client,
        css: temp + 'main.css',
        fonts: bower.directory + 'font-awesome/fonts/**/*.*',
        hbs: client + '**/*.hbs',
        hbstemplates: clientApp + '**/*.hbs',
        images: client + 'images/**/*.*',
        index: client + 'index.hbs',
        // app js, with no specs
        js: [
            client + '**/*.js'
        ],
        scss: client + 'styles/main.scss',
        root: root,
        server: server,
        source: 'src/',
        temp: temp,
        /**
         * browser sync
         */
        browserReloadDelay: 1000,

        /**
         * Node settings
         */
        nodeServer: './src/server/app.js',
        defaultPort: '7203'

    };
    return config;
};