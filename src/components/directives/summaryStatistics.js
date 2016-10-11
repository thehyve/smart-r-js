//# sourceURL=summaryStatistics.js

'use strict';

angular.module('smartRApp').directive('summaryStats',
    ['$rootScope', 'rServeService', '$log',
    function($rootScope, rServeService, $log) {
        return {
            restrict: 'E',
            scope: {
                summaryData: '=',
                images: '='
            },
            link: function(scope, elm, attrs) {
                scope.$watch( function() {
                    return scope.summaryData;
                }, function(updated, old) {
                    if (!_.isEqual(updated, old)) {
                        _.each(updated.summary, function(sum) {
                            sum.then( function(p) {
                                var imgPath = p.img;

                                rServeService.fetchImageResource(imgPath)
                                    .then( function(res) {
                                        scope.images[imgPath] = res;
                                    }, function(e) {
                                        $log.error("Error while fetching the image for path", imgPath, e);
                                    });
                            });
                        });
                    }
                });
            },
            templateUrl:   'app/SmartR/containers/templates/summaryStatistics.html'
        };
    }
]);
