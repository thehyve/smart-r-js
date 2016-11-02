//# sourceURL=summaryStatistics.js

'use strict';

angular.module('smartRApp').directive('summaryStats',
    '$rootScope',
    function($rootScope) {
        return {
            restrict: 'E',
            scope: {
                summaryData: '='
            },
            templateUrl:   'src/containers/templates/summaryStatistics.html'
        };
    }
]);
