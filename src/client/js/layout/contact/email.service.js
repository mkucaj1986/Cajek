(function() {
    'use strict';
    angular
        .module('app.layout')
        .factory('emailService', emailService);
    /* @ngInject */
    function emailService($rootScope, $http, growl) {
        var service = {
            sendEmail: sendEmail
        };
        return service;

        function sendEmail(emailData) {
            $rootScope.$broadcast("sendingMessage", true);
            return $http.post('/contactForm', emailData).then(function(data) {
                    $rootScope.$broadcast("sendingMessage", false);
                    growl.addSuccessMessage("Your Email was sent");
                })
                .catch(function(err) {
                    growl.addErrorMessage("Message not sent");
                });
        }
    }
})();
