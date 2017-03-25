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

        vm.goPortfolioLogo = function() {
            var index = 0;
            jQuery(".home-anchor").addClass('active');
            $rootScope.$broadcast("setHomeIndex", index);
        };
        vm.getMore = function() {
            var target = jQuery('.welcome-anchor');
            jQuery(target).addClass('active');
        };
        vm.toTheTop = function($event) {
            $event.preventDefault();
            var anchorLinks = jQuery('.nav li a').removeClass('active');
            var anchorLinksPagination = jQuery('.nav-pagination li a').removeClass('active');
            var home = jQuery('.nav li a');
            home = jQuery(home[0]);
            $document.scrollTopAnimated(0, 700).then(function() {});
            home.addClass('active');
            var target = jQuery('.nav-pagination li a')[0];
            jQuery(target).addClass('active');
        };

        vm.scrollToElement = function(element, $event) {
            $event.preventDefault();
            var listTarget = jQuery($event.target).parent().parent();
            jQuery('.main-nav-links li a').removeClass('active');
            var anchorLinks = jQuery(listTarget).find('li a');
            var mainNavLinks = jQuery('#navbar ul').find('li a');
            var anchorLinksPagination = jQuery('.nav-pagination li a').removeClass('active');
            var anchor = jQuery($event.target);
            var anchorIndex = anchorLinks.index(anchor);
            var anchorIndexPagination = anchorLinksPagination.index(anchor);
            var anchorLinksTarget = jQuery(mainNavLinks[anchorIndex]);
            var anchorLinksTargetPagination = jQuery(anchorLinksPagination[anchorIndex]);
            anchorLinksTarget.addClass('active');
            anchorLinksTargetPagination.addClass('active');
            var someElement = angular.element(document.getElementById(element));
            var isNotLogo = anchor[0].id !== 'logo';
            $document.scrollToElementAnimated(someElement, 33, 900);
            if (isNotLogo) {
                $rootScope.$broadcast("setAnchorIndex", anchorIndex);
            }
        };

        vm.scrollToElementFullpage = function(element, $event) {
            $event.preventDefault();
            var someElement = angular.element(document.getElementById(element));
            $document.scrollToElementAnimated(someElement, 33, 900);
        };

        vm.isScrollorClick = function() {
            $rootScope.$broadcast("isNotScroll");
        };
        $rootScope.$on("scrollPage", function($event, el, index) {
            vm.startingLocation = el;
            var hasClass = jQuery('#' + el).hasClass('is-active');
            var anchorLink = jQuery('.nav li a');
            anchorLink = jQuery(anchorLink[index]);
            var anchorLinksPagination = jQuery('.nav-pagination li a').removeClass('active');
            var anchorLinksTargetPagination = jQuery(anchorLinksPagination[index]);
            anchorLinksTargetPagination.addClass('active');
            if (hasClass) {
                $timeout(function() {
                    $rootScope.$broadcast("updateLocation", anchorLink);
                    vm.scrollToElementFullpage(el, $event);
                }, 90);
            }
            return vm.el;
        });

        vm.date = new Date();

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
