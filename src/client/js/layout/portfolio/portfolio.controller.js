(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('portfolioCtrl', portfolioCtrl);

    /* @ngInject */
    function portfolioCtrl($window, $rootScope, $scope) {
        var vm = this;
        console.log('portfolioCtrl');

        $scope.items = [{
            "id": 0,
            "picture": "http://placehold.it/32x32",
            "age": 31,
            "name": "Mathews Goff"
        }, {
            "id": 1,
            "picture": "http://placehold.it/32x32",
            "age": 36,
            "name": "Collins Alston"
        }, {
            "id": 2,
            "picture": "http://placehold.it/32x32",
            "age": 27,
            "name": "Jasmine Rollins"
        }, {
            "id": 3,
            "picture": "http://placehold.it/32x32",
            "age": 32,
            "name": "Julie Jefferson"
        }, {
            "id": 4,
            "picture": "http://placehold.it/32x32",
            "age": 23,
            "name": "Wilder King"
        }, {
            "id": 5,
            "picture": "http://placehold.it/32x32",
            "age": 23,
            "name": "Stanley Moore"
        }, {
            "id": 6,
            "picture": "http://placehold.it/32x32",
            "age": 36,
            "name": "Reynolds Bishop"
        }, {
            "id": 7,
            "picture": "http://placehold.it/32x32",
            "age": 26,
            "name": "Bryant Flowers"
        }, {
            "id": 8,
            "picture": "http://placehold.it/32x32",
            "age": 38,
            "name": "Jenifer Martinez"
        }, {
            "id": 9,
            "picture": "http://placehold.it/32x32",
            "age": 40,
            "name": "Mcguire Pittman"
        }];
    }
})();
