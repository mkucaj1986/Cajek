(function() {
    'use strict';
    angular
        .module('app.layout')
        .directive('welcomeAnimation', welcomeAnimation);
    /* @ngInject */
    function welcomeAnimation($window, $compile, $templateRequest) {
        var directive = {
            link: link,
            restrict: 'EAC',
            scope: {}
        };
        return directive;

        function link(scope, element, attrs, vm) {
            if(attrs.slidedirection === 'slideLeft'){
                $templateRequest('src/client/js/layout/home/animationDirective/animationTplLeft.hbs').then(function(html) {
                    var template = angular.element(html);
                    element.append(template);
                    element.addClass('slide-left');
                    $compile(template)(scope);
                });
            }
            if(attrs.slidedirection === 'slideRight'){
                $templateRequest('src/client/js/layout/home/animationDirective/animationTplRight.hbs').then(function(html) {
                    var template = angular.element(html);
                    element.append(template);
                    element.addClass('slide-right');
                    $compile(template)(scope);
                });
            }
        }
    }
})();
