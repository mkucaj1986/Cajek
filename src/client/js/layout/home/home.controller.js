(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('homeCtrl', homeCtrl);

    /* @ngInject */
    function homeCtrl($document) {
        var vm = this;
        console.log('home ctrl');

        vm.toTheTop = function() {
            $document.scrollTopAnimated(0, 700).then(function() {});
        };

        vm.scrollToElement = function(element) {
            var someElement = angular.element(document.getElementById(element));
            $document.scrollToElementAnimated(someElement, 53);
        };
    }
})();