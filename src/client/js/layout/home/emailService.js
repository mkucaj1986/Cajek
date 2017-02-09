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
            return $http.post('/contact', emailData);
        }
    }
})();
