(function() {
    'use strict';

    angular
        .module('app.core')
        .config(config)
        .run(runBlock);

    function config($urlRouterProvider, $locationProvider, $anchorScrollProvider) {
        // use the HTML5 History API
        $anchorScrollProvider.disableAutoScrolling();
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        console.log('config');
    }

    function runBlock($rootScope, $location, $timeout) {
        var anchorSpy = {
            status: 'on',
            isScroll: ''
        };
        history.replaceState(null, null, '#home');
        if (!window.history || !history.replaceState) {
            return;
        }
        $rootScope.$on("scrollPage", function($event, el, index) {
            anchorSpy.status = 'off';
            anchorSpy.isScroll = true;
            return anchorSpy;
        });

        $rootScope.$on("isNotScroll", function($event) {
            anchorSpy.status = 'on';
            anchorSpy.isScroll = false;
            return anchorSpy;
        });

        $rootScope.$on('duScrollspy:becameActive', function($event, $element, $target) {
            anchorSpy.status = 'on';

            if (anchorSpy.status === 'on' && anchorSpy.isScroll === false) {
                $event.preventDefault();
                var hash = $element.prop('hash');
                if (hash) {
                    history.replaceState(null, null, hash);
                }
            }
            if (anchorSpy.status === 'off') {
                return false;
            }
        });

        $rootScope.$on("updateLocation", function($event, el) {
            $event.preventDefault();
            var hash = el.prop('hash');
            if (hash) {
                history.replaceState(null, null, hash);
            }
        });
    }
    //Automaticly update location

    console.log('run');

})();
