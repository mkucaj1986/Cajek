(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('contactCtrl', contactCtrl);

    /* @ngInject */
    function contactCtrl(emailService) {
        var vm = this;
        console.log('contact');
        // CONTACT FORM
        vm.data = {};
        vm.invalidClass = false;
        vm.sendEmail = function(contactForm) {
            vm.submitClicked = true;
            if (contactForm.$valid) {
                console.log('mailSent');
                console.log(vm.data);
                emailService.sendEmail(vm.data);
            } else {
                vm.invalidClass = true;
            }
        };
    }
})();
