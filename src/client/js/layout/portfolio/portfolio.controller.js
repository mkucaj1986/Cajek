(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('portfolioCtrl', portfolioCtrl);

    /* @ngInject */
    function portfolioCtrl($window, $rootScope, $timeout, $scope, portfolioData, growl) {
        var vm = this;

        angular.element(document).ready(function() {
            getData();
        });

        function getData() {
            portfolioData.getData().then(function(response) {
                    growl.addSuccessMessage("Websites Loaded");
                    $scope.items = response.data.websites;
                })
                .catch(function(err) {
                    growl.addErrorMessage("error in get Data");
                });
        }

    }
})();
