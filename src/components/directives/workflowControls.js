//# sourceURL=workflowControls.js

'use strict';

angular.module('smartRApp').directive('workflowControls', [
    '$rootScope',
    function($rootScope) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl:  'app/SmartR/containers/templates/workflowControls.html'
        };
    }
]);
