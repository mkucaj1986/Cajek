(function() {
    'use strict';
    angular
        .module('app.layout')
        .directive('loadingSpinner', loadingSpinner);
    /* @ngInject */
    function loadingSpinner($window, $compile, $templateRequest) {
        var directive = {
            link: link,
            restrict: 'EAC',
            scope:false
        };
        return directive;

        function link(scope, element, attrs, vm) {
            $templateRequest('src/client/js/layout/home/loadingSpinner/loadingSpinner.hbs').then(function(html) {
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
            scope.$on('$stateChangeStart', showSpinner);
            scope.$on('$stateNotFound', hideSpinner);
            scope.$on('$stateChangeError', hideSpinner);
            scope.$on('$viewContentLoaded', hideSpinner);

            function showSpinner() {
                console.log('start spinner');
                element.removeClass('ng-hide');
            }

            function hideSpinner() {
                console.log('stop spinner');
                element.addClass('ng-hide');
            }
        }
    }
})();
