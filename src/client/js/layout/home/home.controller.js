(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('homeCtrl', homeCtrl);

    /* @ngInject */
    function homeCtrl() {
        var vm = this;
       console.log('home ctrl');
    }
})();
