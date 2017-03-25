(function() {
    'use strict';
    angular
        .module('app.layout')
        .factory('animationService', animationService);
    /* @ngInject */
    function animationService($rootScope) {
        var service = {
            imgAnimation: imgAnimation
        };
        return service;

        function imgAnimation(el) {
            if (el === '#welcome') {
                $rootScope.welcomeDir = true;
            }
            if (el === '#profile') {
                $rootScope.profileDir = true;
            }
            if (el === '#skills') {
                $rootScope.skillsDir = true;
            }
            if (el === '#contact') {
                jQuery('.footer-main-wrapp').addClass('slide-up-fade-in');
            }
            if (el !== '#contact') {
                jQuery('.footer-main-wrapp').removeClass('slide-up-fade-in');
            }
        }
    }
})();
