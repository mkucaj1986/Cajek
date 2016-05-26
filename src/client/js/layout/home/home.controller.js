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
            $document.scrollTopAnimated(0, 700).then(function() {
                console && console.log('You just scrolled to the top!');
            });
        };
    }
})();