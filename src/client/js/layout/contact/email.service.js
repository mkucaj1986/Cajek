(function() {
    'use strict';
    angular
        .module('app.layout')
        .factory('emailService', emailService);
    /* @ngInject */
    function emailService($http, growl) {
        var service = {
            sendEmail: sendEmail
        };
        return service;

        function sendEmail(emailData) {
            return $http.post('/contactForm', emailData)
                .success(function(data) {
                    growl.addSuccessMessage("Your Email was sent");
                    console.log(data);
                })
                .error(function(err) {
                    growl.addErrorMessage("Message not sent");
                    console.log(err);
                });
        }
    }
})();
