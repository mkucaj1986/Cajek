(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('contactCtrl', contactCtrl);

    /* @ngInject */
    function contactCtrl($rootScope, emailService) {
        var vm = this;
        // CONTACT FORM
        vm.submitClicked = false;
        vm.data = {};
        vm.invalidClass = false;
        vm.hideMobileParts = function(focus) {
            if (focus && $rootScope.isNotMobile) {
                jQuery('.header').css('display', 'none');
                jQuery('.footer').css('display', 'none');
            }
            if (!focus && $rootScope.isNotMobile) {
                jQuery('.header').css('display', 'block');
                jQuery('.footer').css('display', 'block');
            }
        }
        vm.sendEmail = function(contactForm) {
            vm.submitClicked = true;
            if (contactForm.$valid) {
                emailService.sendEmail(vm.data);
                clearForm(vm.data);
                vm.submitClicked = false;
            } else {
                vm.invalidClass = true;
            }
            $rootScope.$evalAsync();
        };

        function clearForm(data) {
            data.name = '';
            data.email = '';
            data.message = '';
        }
    }
})();
