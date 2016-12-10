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
                animationDuration: 700
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
            var paginationHTML = function(sections) {
                var paginationList = '';
                var bodyTag = jQuery('body')[0];
                var pagination = document.createElement('ul');
                for (var i = 0; i < sections.length; i++) {
                    paginationList += '<li><a data-index=\"' + i + '\" href=\"#' + i + '"\></a></li>';
                }
                pagination.setAttribute('class', 'slide-navigation');
                pagination.innerHTML = paginationList;
                bodyTag.appendChild(pagination);
            };
            var move = function(index) {
                makeActive(index, sections);
                var sectiontoMove = document.querySelectorAll('.is-active');
                sectiontoMove = sectiontoMove[0].id;
                jQuery(el).css('Transition', 'transform ' + fullPagePlugin.animationDuration + 'ms'); 
                $rootScope.$broadcast("scrollPage", sectiontoMove, index);
            };

            function initFn() {
                var index = this.index;
                $document.addEventListener('keydown', keydown);
                $document.addEventListener('mousewheel', mousewheel);
                $document.addEventListener('DOMMouseScroll', dOMMouseScroll);
                paginationHTML(sections);
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
                if (time - Math.abs(lastAnimation) < fullPagePlugin.animationDuration) {
                    return;
                }

                if (delta < 0) {
                    moveDown();
                } else {
                    moveUp();
                }
                lastAnimation = time;
            }

            function keydown() {
                // body...
            }

            function dOMMouseScroll() {
                // body...
            }

            function startFullPage() {
                fullPagePlugin.init();
            }
            startFullPage();
            return fullPagePlugin;
        }

    }
})();
