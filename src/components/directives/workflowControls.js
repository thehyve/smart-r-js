//# sourceURL=workflowControls.js

'use strict';

angular.module('smartRApp').directive('workflowControls', [
    '$rootScope',
    'smartRUtils',
    function($rootScope, smartRUtils) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl:  'src/containers/templates/workflowControls.html'
            link: function(scope, element) {
                var controls = element.children()[0];
                var scrollbarWidth = smartRUtils.getScrollBarWidth();
                controls.style.bottom = scrollbarWidth + 'px';
                controls.style.right = scrollbarWidth + 'px';
            }
        };
    }
]);
