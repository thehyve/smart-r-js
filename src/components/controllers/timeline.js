
angular.module('smartRApp').controller('TimelineController',
    ['$scope', 'smartRUtils', 'commonWorkflowService', function($scope, smartRUtils, commonWorkflowService) {

        commonWorkflowService.initializeWorkflow('timeline', $scope);

        // model
        $scope.conceptBoxes = {datapoints:{concepts:[]}};
        $scope.scriptResults = {};
        $scope.params = {};
    }]);
