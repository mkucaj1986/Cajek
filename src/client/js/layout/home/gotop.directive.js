(function() {
    'use strict';
    angular
        .module('app.layout')
        .directive('gotopDirective', gotopDirective)
        .directive('resizeDir', resizeDir);
    /* @ngInject */
    function gotopDirective($window) {
        var directive = {
            link: link,
            restrict: 'EAC'
        };
        return directive;

        function link(scope, element, attrs, vm) {
            angular.element($window).bind("scroll", function() {
                var currentScroll = $(this).scrollTop();
                if (currentScroll >= 300) {
                    scope.goUpArrow = true;
                } else {
                    scope.goUpArrow = false;
                }
                scope.$apply();
            });
        }
    }

    function resizeDir($window, $document) {
        var directive = {
            link: link,
            restrict: 'EAC'
        };
        return directive;

        function link(scope, element, attrs, vm) {
            var w = angular.element($window);
            scope.getWindowDimensions = function() {
                return {
                    'h': w.height(),
                    'w': w.width()
                };
            };
            scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
                scope.windowHeight = newValue.h;
                scope.windowWidth = newValue.w;

                scope.style = function() {
                    return {
                        'height': newValue.h + 'px',
                        // 'width': newValue.w + 'px'
                    };
                };

            }, true);

            w.bind('resize', function() {
                scope.$apply();
            });
        }
    }
})();
