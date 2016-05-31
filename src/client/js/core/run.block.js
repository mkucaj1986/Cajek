(function() {
    'use strict';

    angular
        .module('app.core')
        .config(config)
        .run(runBlock);

    function config($urlRouterProvider, $locationProvider, $anchorScrollProvider) {
        // use the HTML5 History API
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        console.log('config');
    }

    function runBlock($rootScope, $location) {
        if (!window.history || !history.replaceState) {
            return;
        }
        $rootScope.$on('duScrollspy:becameActive', function($event, $element, $target) {
            //Automaticly update location
            var hash = $element.prop('hash');
            if (hash) {
                history.replaceState({}, '', hash);
            }
        });
    }
    console.log('run');

})();