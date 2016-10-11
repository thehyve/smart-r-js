//# sourceURL=rServeService.js

'use strict';

angular.module('smartRApp').factory('rServeService', [
    'smartRUtils',
    '$q',
    '$http',
    'EndpointService',
    function (smartRUtils, $q, $http, EndpointService) {
        var baseURL = EndpointService.getMasterEndpoint().url;

        var service = {};

        var NOOP_ABORT = function () {
        };
        var TIMEOUT = 10000; // 10 s
        var CHECK_DELAY = 500; // 0.5 s
        var SESSION_TOUCH_DELAY = 60000; // 1 min

        /* we only support one session at a time */

        var state = {
            currentRequestAbort: NOOP_ABORT,
            sessionId: null,
            touchTimeout: null // for current session id
        };
//headers: {'Authorization': 'xxxyyyzzz'}
        var workflow = '';
        /* returns a promise with the session id and
         * saves the session id for future calls */
        var authorizationHeader = '';
        service.startSession = function (name) {
            var authHeaders = EndpointService.getMasterEndpoint().restangular.defaultHeaders;
            authorizationHeader = authHeaders['Authorization'];
            baseURL = EndpointService.getMasterEndpoint().url;
            workflow = name;
            var request = $http({
                url: baseURL + '/RSession/create',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authorizationHeader,
                    Accept: "application/hal+json"
                },
                config: {
                    timeout: TIMEOUT
                },
                data: {
                    workflow: workflow
                }
            });

            return $q(function (resolve, reject) {
                request.then(
                    function (response) {
                        state.sessionId = response.data.sessionId;
                        rServeService_scheduleTouch();
                        resolve();
                    },
                    function (response) {
                        reject(response.statusText);
                    }
                );
            });
        };

        service.fetchImageResource = function (uri) {
            var authHeaders = EndpointService.getMasterEndpoint().restangular.defaultHeaders;
            authorizationHeader = authHeaders['Authorization'];

            var deferred = $q.defer();

            var header = {};
            header.Authorization = authorizationHeader;

            $http({
                method: 'GET',
                headers: header,
                url: uri,
                responseType: 'arraybuffer',
                eventHandlers: {
                    progress: function (e) {
                        deferred.notify(e);
                    }
                }
            }).then(function (res) {
                var arr = new Uint8Array(res.data);

                // Convert the int array to a binary string
                // We have to use apply() as we are converting an *array*
                // and String.fromCharCode() takes one or more single values, not
                // an array.
                var raw = String.fromCharCode.apply(null, arr);
                var b64 = btoa(raw);
                var dataURL = "data:image/jpeg;base64," + b64;

                return deferred.resolve(dataURL);
            }).catch(function (err) {
                return deferred.reject({
                    status: this.status,
                    statusText: xmlHTTP.statusText
                })
            });

            return deferred.promise;
        };

        service.touch = function (sessionId) {
            if (sessionId !== state.sessionId) {
                return;
            }

            var touchRequest = $http({
                url: baseURL + '/RSession/touch',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authorizationHeader,
                },
                config: {
                    timeout: TIMEOUT
                },
                data: {
                    sessionId: sessionId
                }
            });

            touchRequest.finally(function () {
                rServeService_scheduleTouch(); // schedule another
            });
        };

        function rServeService_scheduleTouch() {
            window.clearTimeout(state.touchTimeout);
            state.touchTimeout = window.setTimeout(function () {
                service.touch(state.sessionId);
            }, SESSION_TOUCH_DELAY);
        }

        service.deleteSessionFiles = function (sessionId) {
            sessionId = sessionId || state.sessionId;

            return $http({
                url: baseURL + '/RSession/deleteFiles',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authorizationHeader,
                },
                config: {
                    timeout: TIMEOUT
                },
                data: {
                    sessionId: sessionId
                }
            });
        };

        service.destroySession = function (sessionId) {
            sessionId = sessionId || state.sessionId;

            if (!sessionId) {
                return;
            }

            var request = $http({
                url: baseURL + '/RSession/delete',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authorizationHeader,
                },
                config: {
                    timeout: TIMEOUT
                },
                data: {
                    sessionId: sessionId
                }
            });

            return request.finally(function () {
                if (state.sessionId === sessionId) {
                    service.abandonCurrentSession();
                }
            });
        };

        service.abandonCurrentSession = function () {
            window.clearTimeout(state.touchTimeout);
            state.sessionId = null;
        };

        service.destroyAndStartSession = function (workflowName) {
            $q.when(service.destroySession()).then(function () {
                service.startSession(workflowName);
            });
        };

        /*
         * taskData = {
         *     arguments: { ... },
         *     taskType: 'fetchData' or name of R script minus .R,
         *     phase: 'fetch' | 'preprocess' | 'run',
         * }
         */
        service.startScriptExecution = function (taskDataOrig) {

            var taskData = $.extend({}, taskDataOrig); // clone the thing
            state.currentRequestAbort();

            var canceler = $q.defer();
            var _httpArg = {
                url: baseURL + '/ScriptExecution/run',
                method: 'POST',
                timeout: canceler.promise,
                responseType: 'json',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authorizationHeader,
                },
                data: {
                    sessionId: state.sessionId,
                    arguments: taskData.arguments,
                    taskType: taskData.taskType,
                    workflow: workflow
                }
            };
            console.log(_httpArg);
            var runRequest = $http(_httpArg);

            runRequest.finally(function () {
                state.currentRequestAbort = NOOP_ABORT;
            });

            state.currentRequestAbort = function () {
                canceler.resolve();
            };

            /* schedule checks */
            var promise = $q(function (resolve, reject) {
                runRequest.then(
                    function (response) {
                        if (!response.data) {
                            console.error('Unexpected response:', response);
                        }
                        taskData.executionId = response.data.executionId;
                        _checkStatus(taskData.executionId, resolve, reject);
                    },
                    function (response) {
                        reject(response.statusText);
                    }
                );
            });

            promise.cancel = function () {
                // calling this method should by itself resolve the promise
                state.currentRequestAbort();
            };

            // no touching necessary when a task is running
            window.clearTimeout(state.touchTimeout);
            promise.finally(rServeService_scheduleTouch.bind(this));

            return promise;
        };

        /* aux function of _startScriptExecution. Needs to follow its contract
         * with respect to the fail and success result of the promise */
        function _checkStatus(executionId, resolve, reject) {
            var canceler = $q.defer();
            var statusRequest = $http({
                method: 'GET',
                timeout: canceler.promise,
                headers: {
                    Authorization: authorizationHeader,
                },
                url: baseURL + '/ScriptExecution/status' +
                '?sessionId=' + state.sessionId +
                '&executionId=' + executionId
            });

            statusRequest.finally(function () {
                state.currentRequestAbort = NOOP_ABORT;
            });
            state.currentRequestAbort = function () {
                canceler.resolve();
            };

            statusRequest.then(
                function (d) {
                    if (d.data.state === 'FINISHED') {
                        d.data.executionId = executionId;
                        resolve(d.data);
                    } else if (d.data.state === 'FAILED') {
                        reject(d.data.result.exception);
                    } else {
                        // else still pending
                        window.setTimeout(function () {
                            _checkStatus(executionId, resolve, reject);
                        }, CHECK_DELAY);
                    }
                },
                function (response) {
                    reject(response.statusText);
                }
            );
        }

        service.downloadJsonFile = function (executionId, filename) {
            return $http({
                method: 'GET',
                url: this.urlForFile(executionId, filename),
                headers: {
                    Authorization: authorizationHeader,
                },
            });
        };


        service.urlForFile = function (executionId, filename) {
            return baseURL +
                '/ScriptExecution/downloadFile?sessionId=' + state.sessionId +
                '&executionId=' + executionId + '&filename=' + filename;
        };

        service.loadDataIntoSession = function (conceptKeys, dataConstraints, projection) {
            projection = typeof projection === 'undefined' ? 'log_intensity' : projection; // default to log_intensity
            return $q(function (resolve, reject) {
                smartRUtils.getSubsetIds().then(
                    function (subsets) {
                        var _arg = {
                            conceptKeys: conceptKeys,
                            resultInstanceIds: subsets,
                            projection: projection
                        };

                        if (typeof dataConstraints !== 'undefined') {
                            _arg.dataConstraints = dataConstraints;
                        }
                        console.log(_arg);
                        service.startScriptExecution({
                            taskType: 'fetchData',
                            arguments: _arg
                        }).then(
                            resolve,
                            function (response) {
                                reject(response);
                            }
                        );
                    },
                    function () {
                        reject('Could not create subsets!');
                    }
                );
            });
        };

        service.executeSummaryStats = function (phase, projection) {
            projection = typeof projection === 'undefined' ? 'log_intensity' : projection; // default to log_intensity
            return $q(function (resolve, reject) {
                service.startScriptExecution({
                    taskType: 'summary',
                    arguments: {
                        phase: phase,
                        projection: projection // always required, even for low-dim data
                    }
                }).then(
                    function (response) {
                        if (response.result.artifacts.files.length > 0) {
                            service.composeSummaryResults(response.result.artifacts.files, response.executionId, phase)
                                .then(
                                    function (result) {
                                        resolve({result: result});
                                    },
                                    function (msg) {
                                        reject(msg.statusText);
                                    }
                                );
                        } else {
                            resolve({result: {}});
                        }
                    },
                    function (response) {
                        reject(response);
                    }
                );
            });
        };

        service.composeSummaryResults = function (files, executionId, phase) {
            // FIXME: errors from downloadJsonFile do not lead to a reject
            return $q(function (resolve, reject) {
                var retObj = {summary: [], allSamples: 0, numberOfRows: 0},
                    fileExt = {fetch: ['.png', 'json'], preprocess: ['all.png', 'all.json']},

                // find matched items in an array by key
                    _find = function composeSummaryResults_find(key, array) {
                        // The variable results needs var in this case (without 'var' a global variable is created)
                        var results = [];
                        for (var i = 0; i < array.length; i++) {
                            if (array[i].search(key) > -1) {
                                results.push(array[i]);
                            }
                        }
                        return results;
                    },

                // process each item
                    _processItem = function composeSummaryResults_processItem(img, json) {
                        return $q(function (resolve) {
                            service.downloadJsonFile(executionId, json).then(
                                function (d) {
                                    retObj.subsets = d.data.length;
                                    d.data.forEach(function (subset) {
                                        retObj.allSamples += subset.numberOfSamples;
                                        retObj.numberOfRows = subset.totalNumberOfValuesIncludingMissing /
                                            subset.numberOfSamples;
                                    });
                                    resolve({img: service.urlForFile(executionId, img), json: d});
                                },
                                function (err) {
                                    reject(err);
                                }
                            );
                        });
                    };

                // first identify image and json files
                var _images = _find(fileExt[phase][0], files),
                    _jsons = _find(fileExt[phase][1], files);

                // load each json file contents
                for (var i = 0; i < _images.length; i++) {
                    retObj.summary.push(_processItem(_images[i], _jsons[i]));
                }

                $.when.apply($, retObj.summary).then(function () {
                    resolve(retObj); // when all contents has been loaded
                });
            });
        };

        service.preprocess = function (args) {
            return $q(function (resolve, reject) {
                service.startScriptExecution({
                    taskType: 'preprocess',
                    arguments: args
                }).then(
                    resolve,
                    function (response) {
                        reject(response);
                    }
                );
            });
        };

        return service;
    }]);
