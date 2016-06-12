(function() {
    'use strict';
    angular
        .module('app.layout')
        .directive('gotopDirective', gotopDirective);
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
})();