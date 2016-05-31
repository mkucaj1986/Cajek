(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('homeCtrl', homeCtrl);

    /* @ngInject */
    function homeCtrl($document, $location, $anchorScroll, loadService) {
        var vm = this;
        console.log('home ctrl');

        vm.loadPlugins = function() {
            loadService.niceScroll();
        };
        vm.loadPlugins();

        vm.toTheTop = function($event) {
            $event.preventDefault();
            $document.scrollTopAnimated(0, 700).then(function() {});
        };

        vm.scrollToElement = function(element, $event) {
            $event.preventDefault();
            var someElement = angular.element(document.getElementById(element));
            $document.scrollToElementAnimated(someElement, 53);
        };

        vm.date = new Date();

    }
})();