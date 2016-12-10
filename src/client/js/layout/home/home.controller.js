(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('homeCtrl', homeCtrl);

    /* @ngInject */
    function homeCtrl($window, $rootScope, $scope, $document, $timeout, $location, $anchorScroll, loadService) {
        var vm = this;
        console.log('home ctrl');

        vm.startingLocation = 'home';
        vm.loadPlugins = function() {
            loadService.niceScroll();
            loadService.fullPage('main-sections');
        };

        vm.toTheTop = function($event) {
            $event.preventDefault();
            var home = jQuery('.nav li a');
            home = jQuery(home[0]);
            $document.scrollTopAnimated(0, 700).then(function() {});
            home.addClass('active');
        };

        vm.scrollToElement = function(element, $event) {
            $event.preventDefault();
            var someElement = angular.element(document.getElementById(element));
            $document.scrollToElementAnimated(someElement, 33);
        };

        vm.isScrollorClick = function() {
            $rootScope.$broadcast("isNotScroll");
        };
        $rootScope.$on('$locationChangeSuccess', scrollBasedOnLocationChangeEvent);
        $rootScope.$on("scrollPage", function($event, el, index) {
            vm.startingLocation = el;
            var hasClass = jQuery('#' + el).hasClass('is-active');
            var anchorLink = jQuery('.nav li a');
            anchorLink = jQuery(anchorLink[index]);
            var hassWhiteColor = $location.url() === '/#skills' || $location.url() === '/#contact';
            if (hasClass) {
                $timeout(function() {
                    $rootScope.$broadcast("updateLocation", anchorLink);
                    vm.scrollToElement(el, $event);
                }, 100);
            }
            return vm.el;
        });

        function scrollBasedOnLocationChangeEvent(angularEvent, newUrl, oldUrl, newState, oldState) {}
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
            // return route === $location.url();
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
        $timeout(function() {
            vm.loadPlugins();
        }, 500);

    }
})();
