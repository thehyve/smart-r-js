//# sourceURL=tabContainer.js

'use strict';

angular.module('smartRApp').directive('tabContainer',
    ['$rootScope', 'smartRUtils', '$timeout', function($rootScope, smartRUtils, $timeout) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl:  'app/SmartR/containers/templates/tabContainer.html',
            controller: function($scope) {
                $scope.tabs = [];
                this.addTab = function(tab) {
                    $scope.tabs.push(tab);
                };
            },
            link: function() {
                $timeout(function() { // init jQuery UI tabs after DOM has rendered
                    $('#heim-tabs').tabs();
                });
            }
        };
    }]);
