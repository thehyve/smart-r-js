//# sourceURL=commonWorkflowService.js

'use strict';

angular.module('smartRApp').factory('commonWorkflowService', ['rServeService', function(rServeService) {
    var service = {};

    service.initializeWorkflow = function(workflowName, scope) {
        service.currentScope = scope;

        rServeService.destroyAndStartSession(workflowName);
    };

    return service;

}]);
