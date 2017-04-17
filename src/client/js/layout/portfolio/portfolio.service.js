(function() {
    'use strict';
    angular
        .module('app.layout')
        .factory('portfolioData', portfolioData);
    /* @ngInject */
    function portfolioData($http) {
        var service = {
            getData: getData,
        };
        return service;

        function getData() {
            return $http.get('data/websites.json')
        }

    }
})();
