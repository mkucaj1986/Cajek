(function() {
    'use strict';
    angular
        .module('app.layout')
        .directive('animationDirective', animationDirective);
    /* @ngInject */
    function animationDirective($window, $compile, $templateRequest) {
        var directive = {
            link: link,
            restrict: 'EAC',
            scope: {}
        };
        return directive;

        function link(scope, element, attrs, vm) {
            if(attrs.slidedirection === 'slideLeft'){
                $templateRequest('views/home/directives/animationTplLeft.hbs').then(function(html) {
                    var template = angular.element(html);
                    element.append(template);
                    element.addClass('slide-left');
                    $compile(template)(scope);
                });
            }
            if(attrs.slidedirection === 'slideRight'){
                $templateRequest('views/home/directives/animationTplRight.hbs').then(function(html) {
                    var template = angular.element(html);
                    element.append(template);
                    element.addClass('slide-right');
                    $compile(template)(scope);
                });
            }
            if(attrs.slidedirection === 'circular'){
                $templateRequest('views/home/directives/animationTplCircular.hbs').then(function(html) {
                    var template = angular.element(html);
                    element.append(template);
                    $compile(template)(scope);
                });
            }
            if(attrs.slidedirection === 'post'){
                $templateRequest('views/home/directives/postAnimation.hbs').then(function(html) {
                    var template = angular.element(html);
                    element.append(template);
                    $compile(template)(scope);
                });
            }
        }
    }
})();
