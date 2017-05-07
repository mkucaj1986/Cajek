(function() {
    'use strict';

    angular
        .module('app.core')
        .config(config)
        .run(runBlock);

    function config($qProvider, $urlRouterProvider, $locationProvider, $anchorScrollProvider, growlProvider) {
        $qProvider.errorOnUnhandledRejections(false);
        growlProvider.globalTimeToLive(4000);
        // use the HTML5 History API
        $anchorScrollProvider.disableAutoScrolling();
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }

    function runBlock($rootScope, $location, $timeout, animationService) {
        checkPath();
        $rootScope.isNotMobile = (function() {
            if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
                return true;
            } else {
                return false;
            }
        })();
        $rootScope.iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
        var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;

        if ('addEventListener' in document && iOS) {
            document.addEventListener('DOMContentLoaded', function() {
                FastClick.attach(document.body);
            }, false);
        }
        $rootScope.welcomeDir = false;
        $rootScope.profileDir = false;
        var anchorSpy = {
            status: 'on',
            isScroll: ''
        };
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
                    changePaginationColor(hash);
                    imageAnimation(hash);
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
                changePaginationColor(hash);
                imageAnimation(hash);
            }
        });

        function checkPath() {
            const portfolioPage = $location.$$path === "/portfolio";
            if (portfolioPage) {
                return false;
            }
            history.replaceState(null, null, '#home');
        }

        function changePaginationColor(hash) {
            var hassWhiteColor = hash === '#work-education' || hash === '#contact';
            var anchorLinksPagination = jQuery('.nav-pagination li a');
            if (hassWhiteColor) {
                anchorLinksPagination.addClass('black-pagination-circle');
            } else {
                anchorLinksPagination.removeClass('black-pagination-circle');
            }
        }

        function imageAnimation(hash) {
            var welcome = hash === '#welcome';
            var profile = hash === '#profile';
            var skills = hash === '#skills';
            var contact = hash === '#contact';
            if (welcome) {
                $timeout(function() {
                    animationService.imgAnimation(hash);
                }, 700);
            } else {
                $rootScope.welcomeDir = false;
                $rootScope.$apply();
            }
            if (profile) {
                $timeout(function() {
                    animationService.imgAnimation(hash);
                }, 700);
            } else {
                $rootScope.profileDir = false;
                $rootScope.$apply();
            }
            if (skills) {
                $timeout(function() {
                    animationService.imgAnimation(hash);
                }, 300);
            } else {
                $rootScope.skillsDir = false;
                $rootScope.$apply();
            }
            if (contact) {
                $timeout(function() {
                    animationService.imgAnimation(hash);
                }, 500);
            }
            if (!contact) {
                $timeout(function() {
                    animationService.imgAnimation(hash);
                }, 250);
            }
        }
    }

})();
