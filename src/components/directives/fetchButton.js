//# sourceURL=fetchButton.js

'use strict';

angular.module('smartRApp').directive('fetchButton', [
    '$rootScope',
    'rServeService',
    'smartRUtils',
    function($rootScope, rServeService, smartRUtils) {
        return {
            restrict: 'E',
            scope: {
                conceptMap: '=',
                loaded: '=?',
                running: '=?',
                biomarkers: '=?',
                showSummaryStats: '=?',
                summaryData: '=?',
                allSamples: '=?',
                numberOfRows: '=?',
                allowedCohorts: '=',
                projection: '@?'
            },
            templateUrl: 'app/SmartR/containers/templates/fetchButton.html',
            link: function(scope, element) {
                var template_btn = element.children()[0],
                    template_msg = element.children()[1];

                var _onSuccess = function() {
                    template_msg.innerHTML = 'Task complete! Go to the "Preprocess" or "Run Analysis" tab to continue.';
                    scope.loaded = true;
                    template_btn.disabled = false;
                    scope.running = false;
                };

                var _onFailure = function(msg) {
                    template_msg.innerHTML = 'Error: ' + msg;
                    scope.loaded = false;
                    template_btn.disabled = false;
                    scope.running = false;
                };

                // we add this conditional $watch because there is some crazy promise resolving for allSamples
                // going on. This is a workaround which observes allSamples and uses it as criteria for successful
                // completion. FIXME
                scope.$watch('summaryData', function(newValue) {
                    if (scope.summaryData &&
                            scope.showSummaryStats &&
                            scope.running &&
                            Object.keys(newValue).indexOf('subsets') !== -1) {
                        scope.allSamples = newValue.allSamples;
                        scope.numberOfRows = newValue.numberOfRows;
                        _onSuccess();
                    }
                }, true);

                var _getDataConstraints = function (biomarkers) {
                    if (typeof biomarkers !== 'undefined' && biomarkers.length > 0) {
                        var searchKeywordIds = biomarkers.map(function(biomarker) {
                            return String(biomarker.id);
                        });
                        return {
                            search_keyword_ids: {
                                keyword_ids: searchKeywordIds
                            }
                        };
                    }
                };

                var _showSummaryStats = function() {
                    template_msg.innerHTML = 'Executing summary statistics, please wait <span class="blink_me">_</span>';
                    rServeService.executeSummaryStats('fetch')
                        .then(
                            function(data) { scope.summaryData = data.result; }, // this will trigger $watch
                            _onFailure
                        );
                };

                template_btn.onclick = function() {
                    template_btn.disabled = true;
                    template_msg.innerHTML = 'Fetching data, please wait <span class="blink_me">_</span>';

                    scope.summaryData = {};
                    scope.allSamples = 0;
                    scope.loaded = false;
                    scope.running = true;
                    var deleteReq = rServeService.deleteSessionFiles(); // cleanup our working directory
                    var cohorts = smartRUtils.countCohorts();

                    if (cohorts === 0) {
                        _onFailure('No cohorts selected!');
                        return;
                    }

                    if (scope.allowedCohorts.indexOf(cohorts) === -1) {
                        _onFailure('This workflow requires ' + scope.allowedCohorts +
                                   ' cohort(s), but you selected ' + cohorts);
                        return;
                    }

                    for (var conceptGroup in scope.conceptMap) {
                        if (scope.conceptMap.hasOwnProperty(conceptGroup) && !scope.conceptMap[conceptGroup].valid) {
                            _onFailure('Your data do not match the requirements! All fields must be green.');
                            return;
                        }
                    }

                    var conceptKeys = smartRUtils.conceptBoxMapToConceptKeys(scope.conceptMap);
                    if ($.isEmptyObject(conceptKeys)) {
                        _onFailure('No concepts selected!');
                        return;
                    }

                    var dataConstraints = _getDataConstraints(scope.biomarkers);

                    deleteReq.then(
                        rServeService.loadDataIntoSession(conceptKeys, dataConstraints, scope.projection).then(
                            scope.showSummaryStats ? _showSummaryStats : _onSuccess,
                            _onFailure
                        ),
                        _onFailure
                    );


            };
        }
    };
    }]);
