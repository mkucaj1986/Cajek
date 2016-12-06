(function() {
    'use strict';

    angular
        .module('app.layout')
        .factory('loadService', loadService);

    /* @ngInject */
    function loadService() {
        var service = {
            niceScroll: niceScroll,
            fullPage: fullPage
        };
        return service;

        function niceScroll() {
            console.log('factory');
            $(document).ready(function() {
                var nice = $('html').niceScroll({
                    cursorcolor: "#337ab7",
                    cursoropacitymin: 0.5,
                    cursoropacitymax: 1,
                    cursorwidth: "10px",
                    cursorborder: "1px solid #337ab7",
                    cursorborderradius: "3px",
                    scrollspeed: 70,
                    mousescrollstep: 50,
                    smoothscroll: true,
                    zindex: 99999999
                });
            });
        }

        function fullPage() {
            var page = new FullPage("#main-sections", {
                onLeave: function(index) {
                    console.log(index);
                },

                afterLoad: function(index) {
                    console.log(index);
                }

            });

            var moveToTop = document.getElementById("moveToTop");
            var moveToLast = document.getElementById("moveToLast");

            // moveToTop.addEventListener('click', function(e) {
            //     page.moveTo(0);
            //     e.preventDefault();
            // });

            // moveToLast.addEventListener('click', function(e) {
            //     page.moveTo(3);
            //     e.preventDefault();
            // });

        }

    }
})();
