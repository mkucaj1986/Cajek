(function() {
    'use strict';
    angular
        .module('app.layout')
        .directive('navbarDirective', navbarDirective);
    /* @ngInject */
    function navbarDirective($window) {
        var directive = {
            link: link,
            controllerAs: 'vm',
            restrict: 'EAC'
        };
        return directive;

        function link(scope, element, attrs, vm) {
            angular.element($window).bind("scroll", function() {
                if (this.pageYOffset >= 100) {
                    scope.stickynav = true;
                } else {
                    scope.stickynav = false;
                }
                scope.$apply();
            });
        }
    }
})();