(function() {
    'use strict';
    angular
        .module('app.layout')
        .directive('loadingSpinner', loadingSpinner);
    /* @ngInject */
    function loadingSpinner($rootScope, $window, $compile, $templateRequest, $timeout) {
        var directive = {
            link: link,
            restrict: 'EAC',
            scope: false
        };
        return directive;

        function link(scope, element, attrs, vm) {

            $templateRequest('src/client/js/layout/home/loadingSpinner/loadingSpinner.hbs').then(function(html) {
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
            angular.element(document).ready(function() {
                console.log('angular ready');
                angular.element('body').css('overflow', 'hidden');
                $timeout(function() {
                    hideSpinner();
                }, 500);
            });

            function hideSpinner() {
                console.log('stop spinner');
                element.addClass('ng-hide');
                angular.element('body').css('overflow', 'auto');
            }
        }
    }
})();
