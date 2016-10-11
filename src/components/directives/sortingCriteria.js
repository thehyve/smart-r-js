//# sourceURL=sortingCriteria.js

'use strict';

angular.module('smartRApp').directive('sortingCriteria', [
    '$rootScope',
    function($rootScope) {
        return {
            restrict: 'E',
            scope: {
                criteria : '=',
                samples: '=',
                subsets: '='
            },
            templateUrl:   'src/containers/templates/sortingCriteria.html'
        };
    }
]);
