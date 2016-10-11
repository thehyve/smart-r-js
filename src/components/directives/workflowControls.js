//# sourceURL=workflowControls.js

'use strict';

angular.module('smartRApp').directive('workflowControls', [
    '$rootScope',
    function($rootScope) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl:  'src/containers/templates/workflowControls.html'
        };
    }
]);
