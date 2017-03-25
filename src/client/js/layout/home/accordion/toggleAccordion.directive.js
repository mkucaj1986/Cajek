(function() {
    'use strict';
    angular
        .module('app.layout')
        .directive('toggleAccordion', toggleAccordion);
    /* @ngInject */
    function toggleAccordion() {
        var directive = {
            link: link,
            restrict: 'EAC',
            scope: false
        };
        return directive;

        function link(scope, element, attrs) {
            var el = angular.element(document.querySelectorAll('.title-toggle-block'));
            el.on('click', function() {
                var hasclass = angular.element(this).hasClass('open');
                el.removeClass('open');
                if (!hasclass) {
                    $(this).toggleClass("open").not(this);
                }
            });
        }
    }
})();
