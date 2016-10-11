//# sourceURL=conceptBox.js

'use strict';

angular.module('smartRApp').directive('conceptBox', [
    '$rootScope',
    '$http',
    'EndpointService',
    function ($rootScope, $http, EndpointService) {
        return {
            restrict: 'E',
            scope: {
                conceptGroup: '=',
                label: '@',
                tooltip: '@',
                min: '@',
                max: '@',
                type: '@'
            },
            templateUrl: 'app/SmartR/containers/templates/conceptBox.html',
            link: function (scope, element) {
                var max = parseInt(scope.max);
                var min = parseInt(scope.min);

                var template_box = element[0].querySelector('.sr-drop-input'),
                    template_btn = element[0].querySelector('.sr-drop-btn'),
                    template_tooltip = element[0].querySelector('.sr-tooltip-dialog');

                // instantiate tooltips
                $(template_tooltip).tooltip({track: true, tooltipClass: "sr-ui-tooltip"});

                var _clearWindow = function () {
                    scope.conceptGroup.concepts.length = 0;
                    // in order to avoid reassignment of a shared variable with watchers
                };


                scope.onNodeDropEvent = function (event, info, node) {
                    scope.conceptGroup.concepts.push(node);
                    console.log(node);
                    scope.validate();
                };

                var typeMap = {
                    hleaficon: 'HD',
                    null: 'CATEGORICAL_OPTION', // FIXME: alphaicon does not exist yet in transmartApp master branch
                    valueicon: 'NUMERIC'
                };
                var _containsOnlyCorrectType = function () {
                    if (scope.type === undefined) return true;
                    var correct = true;
                    scope.conceptGroup.concepts.forEach(function (conceptObj) {
                        if (scope.type != conceptObj.type) {
                            correct = false;
                            return ;
                        }
                    });
                    return correct;
                };

                var _getNodeDetails = function (conceptKeys, callback) {
                    var headers = EndpointService.getMasterEndpoint().restangular.defaultHeaders;
                    var request = $http({
                        url: pageInfo.basePath + '/SmartR/nodeDetails',
                        method: 'POST',
                        config: {
                            timeout: 10000
                        },
                        data: {
                            conceptKeys: conceptKeys
                        },
                        headers: headers
                    });

                    request.then(
                        callback,
                        function () {
                            alert('Could not fetch node details. Network connection lost?');
                        });
                };


                // bind the button to its clearing functionality
                template_btn.addEventListener('click', function () {
                    _clearWindow();
                    scope.validate();
                });

                // this watches the childNodes of the conceptBox and updates the model on change
                /*new MutationObserver(function() {
                 scope.conceptGroup.concepts = _getConcepts(); // update the model
                 scope.validate();
                 scope.$apply();
                 }).observe(template_box, { childList: true });*/

                scope.validate = function () {
                    scope.instructionMinNodes = scope.conceptGroup.concepts.length < min;
                    scope.instructionMaxNodes = max !== -1 && scope.conceptGroup.concepts.length > max;
                    scope.instructionNodeType = !_containsOnlyCorrectType();
                    if (scope.type === 'HD' && scope.conceptGroup.concepts.length > 1) {
                        _getNodeDetails(scope.conceptGroup.concepts, function (response) {
                            if (Object.keys(response.data).length < 2) {
                                var platforms = response.data[Object.keys(response.data)[0]].platforms;
                                scope.instructionNodePlatform = !platforms.every(function (el) {
                                    return el.title === platforms[0].title;
                                });
                            } else {
                                scope.instructionNodePlatform = true;
                            }
                        });
                    } else {
                        scope.instructionNodePlatform = false;
                    }
                };

                scope.$watchGroup([
                        'instructionNodeType',
                        'instructionNodePlatform',
                        'instructionMaxNodes',
                        'instructionMinNodes'],
                    function (newValue) {
                        var instructionNodeType = newValue[0],
                            instructionNodePlatform = newValue[1],
                            instructionMaxNodes = newValue[2],
                            instructionMinNodes = newValue[3];
                        scope.conceptGroup.valid = !(instructionNodeType ||
                        instructionNodePlatform ||
                        instructionMaxNodes ||
                        instructionMinNodes);
                    });

                scope.validate();
            }
        };
    }]);
