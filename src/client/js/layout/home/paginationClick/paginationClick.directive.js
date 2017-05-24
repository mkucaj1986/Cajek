(function() {
    'use strict';
    angular
        .module('app.layout')
        .directive('paginationClick', paginationClick);
    /* @ngInject */
    function paginationClick($window, $compile, $templateRequest) {
        var directive = {
            link: link,
            restrict: 'EAC',
            scope: false
        };
        return directive;

        function link(scope, element, attrs, vm) {
            $templateRequest('views/home/directives/paginationClick.hbs').then(function(html) {
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
        }
    }
})();
