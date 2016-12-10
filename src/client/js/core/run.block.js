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
        if (!window.history || !history.replaceState) {
            return;
        }
        $rootScope.$on('duScrollspy:becameActive', function($event, $element, $target) {
            var disableSpy = {};
            $rootScope.$on("scrollPage", function($event, el, index) {
                disableSpy = true;
                console.log('scroll page');
            });
            //Automaticly update location
            if(!disableSpy){
                $event.preventDefault();
                var hash = $element.prop('hash');
                if (hash) {
                    history.replaceState(null, null, hash);
                }
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
    console.log('run');

})();
