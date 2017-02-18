(function() {
    'use strict';
    angular
        .module('app.layout')
        .factory('emailService', emailService);
    /* @ngInject */
    function emailService($http) {
        var service = {
            sendEmail: sendEmail
        };
        return service;

        function sendEmail(emailData) {
            return $http.post('/contactForm', emailData)
                .success(function(data) {
                    console.log(data);
                })
                .error(function(err) {
                    console.log(err);
                });
        }
    }
})();
