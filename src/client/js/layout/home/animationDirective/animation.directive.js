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
                $templateRequest('./src/client/views/home/animationTplLeft.hbs').then(function(html) {
                    var template = angular.element(html);
                    element.append(template);
                    element.addClass('slide-left');
                    $compile(template)(scope);
                });
            }
            if(attrs.slidedirection === 'slideRight'){
                $templateRequest('src/client/views/home/animationTplRight.hbs').then(function(html) {
                    var template = angular.element(html);
                    element.append(template);
                    element.addClass('slide-right');
                    $compile(template)(scope);
                });
            }
            if(attrs.slidedirection === 'circular'){
                $templateRequest('src/client/views/home/animationTplCircular.hbs').then(function(html) {
                    var template = angular.element(html);
                    element.append(template);
                    $compile(template)(scope);
                });
            }
            if(attrs.slidedirection === 'post'){
                $templateRequest('src/client/views/home/postAnimation.hbs').then(function(html) {
                    var template = angular.element(html);
                    element.append(template);
                    $compile(template)(scope);
                });
            }
        }
    }
})();
