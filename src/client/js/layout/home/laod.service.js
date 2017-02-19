(function() {
    'use strict';
    angular
        .module('app.layout')
        .factory('loadService', loadService);
    /* @ngInject */
    function loadService($rootScope, $document) {
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
                // Hide bootstrap menu on click
                $("#navbar").find("li a").on("click", function() {
                    $('.navbar-collapse.in').collapse('hide');
                });
            });
        }

        function fullPage(element) {
            $document = $document[0];
            var fullPagePlugin = {
                index: 0,
                lastAnimation: 0,
                section: '.section',
                init: initFn,
                destroy: destroyFn,
                animationDuration: 900
            };
            // Element
            var el = document.getElementById(element);
            // Index
            var index = fullPagePlugin.index;
            // Sections
            var sections = document.querySelectorAll(fullPagePlugin.section);
            // Last Animation
            var lastAnimation = fullPagePlugin.lastAnimation;
            // CORE FUNCTIONS
            $rootScope.$on("setAnchorIndex", function($event, index) {
                getIndex(index);
            });
            $rootScope.$on("setHomeIndex", function($event, index) {
                getIndex(index);
            });

            function getIndex(idx) {
                index = idx;
                return index;
            }

            function moveUp() {
                if (index > 0) {
                    index = index - 1;
                    move(index);
                }
                return index;
            }

            function moveDown() {
                if ((index) < sections.length - 1) {
                    index = index + 1;
                    move(index);
                }
                return index;
            }
            var makeActive = function(index, sections) {
                var paginationLinks = document.querySelectorAll('.slide-navigation li a');
                var anchorLinks = document.querySelectorAll('.nav li a');
                for (var i = 0; i < sections.length; i++) {
                    jQuery(sections[i]).removeClass('is-active');
                    jQuery(paginationLinks[i]).removeClass('is-active');
                    jQuery(anchorLinks[i]).removeClass('active');
                }
                jQuery(sections[index]).addClass('is-active');
                jQuery(paginationLinks[index]).addClass('is-active');
                jQuery(anchorLinks[index]).addClass('active');
            };
            var move = function(index) {
                makeActive(index, sections);
                var sectiontoMove = document.querySelectorAll('.is-active');
                sectiontoMove = sectiontoMove[0].id;
                jQuery(el).css('Transition', 'transform ' + fullPagePlugin.animationDuration + 'ms');
                $rootScope.$broadcast("scrollPage", sectiontoMove, index);
            };

            function initFn(index) {
                index = index;
                $document.addEventListener('keydown', keydown);
                $document.addEventListener('mousewheel', mousewheel, false);
                $document.addEventListener('DOMMouseScroll', mousewheel, false);
                makeActive(index, sections);
            }

            function destroyFn() {
                $document.removeEventListener('keydown', keydown);
                $document.removeEventListener('mousewheel', mousewheel);
                $document.removeEventListener('DOMMouseScroll', mousewheel);
            }

            function mousewheel(event) {
                event.preventDefault();
                var time = new Date().getTime();
                var delta = 0;
                if (time - Math.abs(lastAnimation) < fullPagePlugin.animationDuration) {
                    return;
                }
                if (!event) event = window.event;
                if (event.wheelDelta) {
                    delta = event.wheelDelta / 120;
                    if (window.opera) delta = -delta;
                } else if (event.detail) {
                    delta = -event.detail / 3;
                }
                if (delta)
                    handle(delta);

                function handle(delta) {
                    if (delta < 0) {
                        moveDown();
                    } else {
                        moveUp();
                    }
                }
                lastAnimation = time;
            }

            function keydown() {
                // body...
            }

            function startFullPage(index) {
                fullPagePlugin.init(index);
            }
            startFullPage(index);
            return fullPagePlugin;
        }
    }
})();
