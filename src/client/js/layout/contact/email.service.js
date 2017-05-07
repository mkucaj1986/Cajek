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
                .then(function(data) {
                    growl.addSuccessMessage("Your Email was sent");
                })
                .catch(function(err) {
                    growl.addErrorMessage("Message not sent");
                    console.log(err);
                });
        }
    }
})();
