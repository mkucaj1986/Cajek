(function() {
    'use strict';
    angular
        .module('app.layout')
        .directive('sendingEmail', sendingEmail);
    /* @ngInject */
    function sendingEmail($rootScope, $window, $compile, $templateRequest, $timeout, emailService) {
        var directive = {
            link: link,
            restrict: 'EAC',
            scope: false
        };
        return directive;

        function link(scope, element, attrs, vm) {
            $templateRequest('views/home/directives/sendingEmail.hbs').then(function(html) {
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });

            $rootScope.$on("sendingMessage", function($event, sendingMessage) {
                if (sendingMessage) {
                    element.css('display', 'inline-block');
                } else {
                    jQuery(element).find('.sending-message-txt').css('display', 'none');
                    jQuery(element).find('.message-sent').css('display', 'block');
                    $timeout(function() {
                        element.css('display', 'none');
                        jQuery(element).find('.sending-message-txt').css('display', 'block');
                        jQuery(element).find('.message-sent').css('display', 'none');
                    }, 1200);
                }
            });
        }
    }
})();
