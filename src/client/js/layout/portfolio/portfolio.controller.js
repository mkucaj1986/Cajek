(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('portfolioCtrl', portfolioCtrl);

    /* @ngInject */
    function portfolioCtrl($window, $rootScope) {
        var vm = this;
        console.log('portfolioCtrl');

    }
})();
