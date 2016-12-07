(function() {
    'use strict';

    angular
        .module('app.layout')
        .factory('loadService', loadService);

    /* @ngInject */
    function loadService($document) {
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

        function fullPage(element) {
            $document = $document[0];
            var fullPagePlugin = {
                index: 0,
                sections: '.section',
                init: initFn,
                destroy: destroyFn
            };
            // Element
            this.el = document.getElementById(element);
            // Index
            this.index = fullPagePlugin.index;
            // Sections
            this.sections = fullPagePlugin.sections;

            var moveUp = function() {
                if (this.index > 0) {
                    this.move(this.index - 1);
                }
            };

            var moveDown = function() {
                if ((this.index + 1) < this.sections.length) {
                    this.move(this.index + 1);
                }
            };
            var makeActive = function(index, sections) {
                var paginationLinks = document.querySelectorAll('.slide-navigation li a');
                var sections = document.querySelectorAll(sections);
                for (var i = 0; i < sections.length; i++) {
                    jQuery(sections[i]).removeClass('is-active');
                    jQuery(paginationLinks[i]).removeClass('is-active');
                }
                jQuery(sections[index]).addClass('is-active');
                jQuery(paginationLinks[index]).addClass('is-active');

            };

            function initFn() {
                var index = this.index;
                var sections = this.sections;
                $document.addEventListener('keydown', keydown);
                $document.addEventListener('mousewheel', mousewheel);
                $document.addEventListener('DOMMouseScroll', dOMMouseScroll);
                makeActive(index, sections);
            }

            function destroyFn() {
                $document.removeEventListener('keydown', keydown);
                $document.removeEventListener('mousewheel', mousewheel);
                $document.removeEventListener('DOMMouseScroll', dOMMouseScroll);
            }

            function mousewheel(event) {
                var time = new Date().getTime();
                var delta = event.wheelDelta || -event.detail;
                var index = fullPagePlugin.index;
                if (delta < 0) {
                    moveDown();
                } else {
                    moveUp();
                }
            }

            function keydown() {
                // body...
                debugger;
            }

            function dOMMouseScroll() {
                // body...
                debugger;
            }

            function startFullPage() {
                fullPagePlugin.init();
            }
            startFullPage();
            return this;
        }

    }
})();
