(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('homeCtrl', homeCtrl);

    /* @ngInject */
    function homeCtrl($document, $timeout, $location, $anchorScroll, loadService) {
        var vm = this;
        console.log('home ctrl');

        vm.loadPlugins = function() {
            loadService.niceScroll();
            loadService.fullPage('main-sections');
        };

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
        // CONTACT FORM
        vm.data = {};
        vm.invalidClass = false;
        vm.sendEmail = function(contactForm) {
            vm.submitClicked = true;
            if (contactForm.$valid) {
                console.log('mailSent');
                console.log(vm.data);
            } else {
                vm.invalidClass = true;
            }
        };

        vm.isActive = function(route) {
            return route === $location.url();
        };

        vm.calculateAge = function(dateString) {
            // birthday is a date
            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        };
        $timeout( function(){
            vm.loadPlugins();
        });
    }
})();
