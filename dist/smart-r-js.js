'use strict';

/**
 */
angular.module('smartRApp', [ 'transmartBaseUiConstants', 'tmEndpoints'])
    .config(['$httpProvider', '$locationProvider', function($httpProvider, $locationProvider) {
        //initialize get if not there
        //if (!$httpProvider.defaults.headers.get) {
        //    $httpProvider.defaults.headers.get = {};
        //}
        //disable IE ajax request caching //Causes error when used in combination with OAuth
        //$httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    }]);
    /*.run(function($rootScope, $http, masterEndpointConfig) {
        // get plugin context path and put it in root scope
        var basePath = masterEndpointConfig.url;
        $http.get(basePath + '/SmartR/smartRContextPath').then(
            function(d) { $rootScope.smartRPath = d.data; },
            function(msg) { throw 'Error: ' + msg; }
        );
    });
*/

angular.module('smartRApp').run(['$templateCache', function($templateCache) {$templateCache.put('src/containers/boxplot/boxplot.content.html','<div class="main-container">\n    <tab-container>\n\n        <workflow-tab tab-name="Fetch Data" disabled="fetch.disabled">\n            <concept-box style="display: inline-block" concept-group="fetch.conceptBoxes.datapoints" type="LD-numerical" min="1" max="1" label="Numerical Variable" tooltip="Select a single numerical variable that you would like to have displayed.">\n            </concept-box>\n            <!----Nice idea but somehow lost it\'s initial purpose because cross-study support is gone.\n            Maybe implement later--->\n            <!----<concept-box style="display: inline-block;"--->\n                             <!----concept-group="fetch.conceptBoxes.subsets"--->\n                             <!----type="LD-categorical"--->\n                             <!----min="0"--->\n                             <!----max="-1"--->\n                             <!----label="(optional) Categorical Variables"--->\n                             <!----tooltip="Select an arbitrary amount of categorical variables to split the numerical variable into subsets.">--->\n            <!----</concept-box>--->\n            <br>\n            <br>\n            <fetch-button concept-map="fetch.conceptBoxes" loaded="fetch.loaded" running="fetch.running" allowed-cohorts="[1,2]">\n            </fetch-button>\n        </workflow-tab>\n\n        <workflow-tab tab-name="Run Analysis" disabled="runAnalysis.disabled">\n            <br>\n            <br>\n            <run-button button-name="Create Plot" store-results-in="runAnalysis.scriptResults" script-to-run="run" arguments-to-use="runAnalysis.params" running="runAnalysis.running">\n            </run-button>\n            <capture-plot-button filename="boxplot.svg" target="boxplot"></capture-plot-button>\n            <br>\n            <br>\n            <boxplot data="runAnalysis.scriptResults" width="1000" height="500"></boxplot>\n        </workflow-tab>\n\n    </tab-container>\n\n</div>\n');
$templateCache.put('src/containers/boxplot/boxplot.html','<div ui-layout="{flow : \'column\'}" class="base-ui-contents">\n    <div ui-layout-container size="20%" min-size="0%">\n        <div ui-view="sidebar"></div>\n    </div>\n\n    <div ui-layout-container min-size="40%">\n        <div ui-view="content"></div>\n    </div>\n</div>\n\n');
$templateCache.put('src/containers/correlation/correlation.content.html','<div ng-controller="CorrelationController" class="main-container">\n\n    <tab-container>\n\n        <workflow-tab tab-name="Fetch Data" disabled="fetch.disabled">\n            <concept-box style="display: inline-block" concept-group="fetch.conceptBoxes.datapoints" type="LD-numerical" min="2" max="2" label="Numerical Variables" tooltip="Select two numerical variables from the tree to compare them.">\n            </concept-box>\n            <concept-box style="display: inline-block" concept-group="fetch.conceptBoxes.annotations" type="LD-categorical" min="0" max="-1" label="(optional) Categorical Variables" tooltip="Select an arbitrary amount of categorical variables from the tree to annotate the numerical datapoints.">\n            </concept-box>\n            <br>\n            <br>\n            <fetch-button concept-map="fetch.conceptBoxes" loaded="fetch.loaded" running="fetch.running" allowed-cohorts="[1]">\n            </fetch-button>\n        </workflow-tab>\n\n        <workflow-tab tab-name="Run Analysis" disabled="runAnalysis.disabled">\n            <div class="heim-input-field sr-input-area">\n                <h2>Data transformation:</h2>\n                <fieldset class="heim-radiogroup">\n                    <label>\n                        <input type="radio" ng-model="runAnalysis.params.transformation" value="raw" checked="checked"> Raw Values\n                    </label>\n                    <label>\n                        <input type="radio" ng-model="runAnalysis.params.transformation" value="log2" checked="checked"> Log2\n                    </label>\n                    <label>\n                        <input type="radio" ng-model="runAnalysis.params.transformation" value="log10" checked="checked"> Log10\n\n                    </label>\n                </fieldset>\n            </div>\n            <div class="heim-input-field sr-input-area">\n                <h2>Correlation computation method:</h2>\n                <fieldset class="heim-radiogroup">\n                    <label>\n                        <input type="radio" ng-model="runAnalysis.params.method" value="pearson" checked="checked"> Pearson\n                    </label>\n                    <label>\n                        <input type="radio" ng-model="runAnalysis.params.method" value="kendall"> Kendall\n                    </label>\n                    <label>\n                        <input type="radio" ng-model="runAnalysis.params.method" value="spearman"> Spearman\n                    </label>\n                </fieldset>\n            </div>\n            <hr class="sr-divider">\n            <run-button button-name="Create Plot" store-results-in="runAnalysis.scriptResults" script-to-run="run" arguments-to-use="runAnalysis.params" running="runAnalysis.running">\n            </run-button>\n            <br>\n            <br>\n            <correlation-plot data="runAnalysis.scriptResults" width="1500" height="1500"></correlation-plot>\n        </workflow-tab>\n\n    </tab-container>\n\n</div>\n');
$templateCache.put('src/containers/correlation/correlation.html','<div ui-layout="{flow : \'column\'}" class="base-ui-contents">\n    <div ui-layout-container size="20%" min-size="0%">\n        <div ui-view="sidebar"></div>\n    </div>\n\n    <div ui-layout-container min-size="50%">\n        <div ui-view="content"></div>\n    </div>\n</div>\n\n');
$templateCache.put('src/containers/heatmap/heatmap.content.html','<div ng-controller="HeatmapController" class="main-container">\n\n    <tab-container>\n        <!----========================================================================================================-->\n        <!---- Fetch Data -->\n        <!----========================================================================================================-->\n        <workflow-tab tab-name="Fetch Data" disabled="fetch.disabled">\n            <concept-box concept-group="fetch.conceptBoxes.highDimensional" type="HD" min="1" max="-1" label="High Dimensional" tooltip="Select high dimensional data node(s) from the Data Set Explorer Tree and drag it into the box.\n                The nodes needs to be from the same platform.">\n            </concept-box>\n\n            <concept-box concept-group="fetch.conceptBoxes.numeric" type="LD-numerical" min="0" max="-1" label="Numeric Variables" tooltip="Select numeric data node(s) from the Data Set Explorer Tree and drag it into the box.">\n            </concept-box>\n\n            <concept-box concept-group="fetch.conceptBoxes.categoric" type="LD-categorical" min="0" max="-1" label="Categoric Variables" tooltip="Select categoric data node(s) from the Data Set Explorer Tree and drag it into the box.">\n            </concept-box>\n\n            <biomarker-selection biomarkers="fetch.selectedBiomarkers"></biomarker-selection>\n            <hr class="sr-divider">\n            <fetch-button loaded="fetch.loaded" running="fetch.running" concept-map="fetch.conceptBoxes" biomarkers="fetch.selectedBiomarkers" show-summary-stats="true" summary-data="fetch.scriptResults" all-samples="common.totalSamples" allowed-cohorts="[1,2]" number-of-rows="common.numberOfRows">\n            </fetch-button>\n            <br>\n            <summary-stats summary-data="fetch.scriptResults" images="fetch.images"></summary-stats>\n        </workflow-tab>\n\n        <!----========================================================================================================-->\n        <!---- Preprocess Data -->\n        <!----========================================================================================================-->\n        <workflow-tab tab-name="Preprocess" disabled="preprocess.disabled">\n            <!----Aggregate Probes-->\n            <div class="heim-input-field">\n                <input type="checkbox" ng-model="preprocess.params.aggregate">\n                <span>Aggregate probes</span>\n            </div>\n\n            <hr class="sr-divider">\n\n            <preprocess-button params="preprocess.params" show-summary-stats="true" summary-data="preprocess.scriptResults" running="preprocess.running" all-samples="common.totalSamples" number-of-rows="common.numberOfRows">\n            </preprocess-button>\n\n            <br>\n            <summary-stats summary-data="preprocess.scriptResults"></summary-stats>\n        </workflow-tab>\n\n\n        <!----========================================================================================================-->\n        <!----Run Analysis-->\n        <!----========================================================================================================-->\n        <workflow-tab tab-name="Run Analysis" disabled="runAnalysis.disabled">\n            <!----Number of max row to display-->\n            <div class="heim-input-field heim-input-number sr-input-area">\n                Show <input type="text" id="txtMaxRow" ng-model="runAnalysis.params.max_row">\n             <!--   of {{ common.numberOfRows }} rows in total. (< 1000 is preferable.) -->\n            </div>\n\n            <!----Type of sorting to apply-->\n            <div class="heim-input-field sr-input-area">\n                <h2>Order columns by:</h2>\n                <fieldset class="heim-radiogroup">\n                    <label>\n                        <input type="radio" ng-model="runAnalysis.params.sorting" name="sortingSelect" value="nodes" checked="checked"> Nodes\n                    </label>\n                    <label>\n                        <input type="radio" ng-model="runAnalysis.params.sorting" name="sortingSelect" value="subjects">\n                        Subjects\n                    </label>\n                </fieldset>\n            </div>\n\n            <div class="heim-input-field sr-input-area">\n                <h2>I have read and accept the <a href="http://www.lifemapsc.com/genecards-suite-terms-of-use/" target="_blank">\n                    GeneCards TOU</a>\n                </h2>\n                <fieldset class="heim-radiogroup">\n                    <label>\n                        <input type="radio" ng-model="runAnalysis.params.geneCardsAllowed" name="geneCardsAllowedSelect" ng-value="true"> yes (use GeneCards)\n                    </label>\n                    <label>\n                        <input type="radio" ng-model="runAnalysis.params.geneCardsAllowed" name="geneCardsAllowedSelect" ng-value="false" checked="checked"> no (use EMBL EBI)\n                    </label>\n                </fieldset>\n            </div>\n\n            <!----Type of sorting to apply-->\n            <div class="heim-input-field sr-input-area">\n                <sorting-criteria criteria="runAnalysis.params.ranking" samples="common.totalSamples" subsets="common.subsets">\n                </sorting-criteria>\n            </div>\n\n            <hr class="sr-divider">\n\n            <run-button button-name="Create Plot" store-results-in="runAnalysis.scriptResults" script-to-run="run" arguments-to-use="runAnalysis.params" filename="heatmap.json" running="runAnalysis.running">\n            </run-button>\n            <capture-plot-button filename="heatmap.svg" disabled="runAnalysis.download.disabled"></capture-plot-button>\n            <download-results-button disabled="runAnalysis.download.disabled"></download-results-button>\n            <br>\n            <workflow-warnings warnings="runAnalysis.scriptResults.warnings"></workflow-warnings>\n            <heatmap-plot data="runAnalysis.scriptResults" width="1200" height="1200" params="runAnalysis.params">\n            </heatmap-plot>\n\n        </workflow-tab>\n\n    </tab-container>\n</div>\n');
$templateCache.put('src/containers/heatmap/heatmap.html','<div ui-layout="{flow : \'column\'}" class="base-ui-contents">\n    <div ui-layout-container size="20%" min-size="0%">\n        <div ui-view="sidebar"></div>\n    </div>\n\n    <div ui-layout-container min-size="50%">\n        <div ui-view="content"></div>\n    </div>\n</div>\n\n');
$templateCache.put('src/containers/templates/biomarkerSelection.html','<div class="sr-fetch-params-area">\n  <div class="heim-input-field heim-autocomplete">\n    <label for="heim-input-txt-identifier">Select a biomarker:</label>\n    <input id="heim-input-txt-identifier">\n    <span style="color: darkgrey"> Biomarker can be a gene, pathway, mirID or UniProtID.</span>\n    <div id="heim-input-list-identifiers">\n      <ul><li ng-repeat="biomarker in biomarkers">\n        <div>\n          <span class="identifier-type">{{biomarker.type}} </span>\n          <span class="identifier-name">{{biomarker.name}} </span>\n          <span class="identifier-synonyms">{{biomarker.synonyms}} </span>\n        </div>\n        <button class="identifier-delete" ng-click="removeIdentifier(biomarker)">&#x2716;</button>\n      </li></ul>\n    </div>\n  </div>\n</div>\n');
$templateCache.put('src/containers/templates/boxplot.html','<workflow-controls ng-show="showControls">\n    <div>\n        <label for="sr-boxplot-log-check">Log2</label>\n        <input type="checkbox" id="sr-boxplot-log-check">\n    </div>\n    <div>\n        <label for="sr-boxplot-jitter-check">Jitter</label>\n        <input type="checkbox" id="sr-boxplot-jitter-check">\n    </div>\n    <div>\n        <label for="sr-boxplot-kde-check">KDE</label>\n        <input type="checkbox" id="sr-boxplot-kde-check">\n    </div>\n    <div>\n        <input type="button" id="sr-boxplot-reset-btn" value="Reset">\n    </div>\n    <div>\n        <input type="button" id="sr-boxplot-remove-btn" value="Remove Outliers">\n    </div>\n</workflow-controls>\n<div id="visualisation"></div>\n');
$templateCache.put('src/containers/templates/conceptBox.html','<div class="heim-input-field heim-dropzone sr-hd-input" data-drop="true" ng-model="droppedNode" jqyoui-droppable="{multiple:true, onDrop:\'onNodeDropEvent(droppedNode)\'}">\n    <label style="display: inline">{{label}} <i class="ui-icon ui-icon-info sr-tooltip-dialog" title="{{tooltip}}"> </i></label>\n    <br><br>\n    <span ng-show="instructionMinNodes" class="sr-instruction">Drag at least {{min}} node(s) into the box<br></span>\n    <span ng-show="instructionMaxNodes" class="sr-instruction">Select at most {{max}} node(s)<br></span>\n    <span ng-show="instructionNodeType" class="sr-instruction">Node(s) do not have the correct type<br></span>\n    <span ng-show="instructionNodePlatform" class="sr-instruction">Nodes must have the same platform</span>\n    <div class="sr-drop-input" ng-class="{true:\'sr-drop-input-valid\', false:\'sr-drop-input-invalid\'}[conceptGroup.valid]" style="overflow-y:auto">\n        <ul>\n            <li ng-repeat="node in conceptGroup.concepts"> {{node.title}}</li>\n        </ul>\n    </div>\n\n\n    <div style="margin-top: 10px; text-align: right">\n        <input type="button" value="Clear Window" class="sr-drop-btn">\n    </div>\n</div>\n');
$templateCache.put('src/containers/templates/fetchButton.html','<input type="button" value="Fetch Data" class="heim-action-button">\n<span style="padding-left: 10px"></span>');
$templateCache.put('src/containers/templates/heatmap.html','<workflow-controls ng-show="showControls">\n    <div>\n        <input type="checkbox" id="sr-heatmap-animate-check" checked="checked">\n        <label for="sr-heatmap-animate-check">Animate</label>\n    </div>\n    <div>\n        <div>\n            <input type="button" id="sr-heatmap-cutoff-btn" value="Apply Cutoff">\n            <input type="range" id="sr-heatmap-cutoff-range" min="0" step="1" value="0">\n        </div>\n        <label for="sr-heatmap-zoom-range">Zoom</label>\n        <input type="range" id="sr-heatmap-zoom-range" min="1" max="200" step="5" value="100">\n    </div>\n    <div>\n        <select id="sr-heatmap-cluster-select">\n            <option disabled="disabled" selected="selected" value> -- select a clustering -- </option>\n            <option value="hclustEuclideanAverage">Hierarch.-Eucl.-Avg.</option>\n            <option value="hclustEuclideanComplete">Hierarch.-Eucl.-Complete</option>\n            <option value="hclustEuclideanSingle">Hierarch.-Eucl.-Single</option>\n            <option value="hclustManhattanAverage">Hierarch.-Manhat.-Avg.</option>\n            <option value="hclustManhattanComplete">Hierarch.-Manhat.-Complete</option>\n            <option value="hclustManhattanSingle">Hierarch.-Manhat.-Single</option>\n        </select><br>\n        <div>\n            <input type="checkbox" id="sr-heatmap-row-check" checked="checked">\n            <label for="sr-heatmap-row-check">Cluster Row</label>\n            <input type="checkbox" id="sr-heatmap-col-check" checked="checked">\n            <label for="sr-heatmap-col-check">Cluster Col</label>\n        </div>\n    </div>\n    <div>\n        <select id="sr-heatmap-ranking-select">\n        </select><br>\n        <select id="sr-heatmap-color-select">\n            <option value="redGreen" selected="selected">Red to Green Schema</option>\n            <option value="redBlue">Red to Blue Schema</option>\n            <option value="blueScale">Blue Schema</option>\n            <option value="greenScale">Green Schema</option>\n        </select>\n    </div>\n</workflow-controls>\n<div id="visualisation"></div>\n');
$templateCache.put('src/containers/templates/preprocessButton.html','<input type="button" value="Preprocess" class="heim-action-button">\n<span style="padding-left: 10px"></span>');
$templateCache.put('src/containers/templates/runButton.html','<input type="button" value="{{name}}">\n<span style="padding-left: 10px"></span>\n');
$templateCache.put('src/containers/templates/sortingCriteria.html','<h2>Ranking Criteria:</h2>\n<div class="heim-input-field-sub" id="sr-non-multi-subset">\n    <fieldset class="heim-radiogroup" id="sr-variability-group" ng-disabled="samples < 2">\n        <h3>Expression variability</h3>\n        <div><label>\n            <input type="radio" ng-model="criteria" value="coef"> Coefficient of variation\n        </label></div>\n        <div><label>\n            <input type="radio" ng-model="criteria" value="variance"> Variance\n        </label></div>\n        <div><label>\n            <input type="radio" ng-model="criteria" value="range"> Range between max and min after\n            excluding outliers\n        </label></div>\n    </fieldset>\n    <fieldset class="heim-radiogroup" id="sr-expression-level-group">\n        <h3>Expression level</h3>\n        <div><label>\n            <input type="radio" ng-model="criteria" value="mean"> Mean\n        </label></div>\n        <div><label>\n            <input type="radio" ng-model="criteria" value="median"> Median\n        </label></div>\n    </fieldset>\n</div>\n<div class="heim-input-field-sub" id="sr-multi-subset">\n    <fieldset class="heim-radiogroup" id="sr-differential-exp-group" ng-disabled="subsets < 2">\n        <h3>Differential expression</h3>\n        <div><label>\n            <input type="radio" ng-model="criteria" value="bval"> B-value/log odds ratio\n        </label></div>\n        <div><label>\n            <input type="radio" ng-model="criteria" value="pval"> p-value\n        </label></div>\n        <div><label>\n            <input type="radio" ng-model="criteria" value="adjpval"> Adjusted p-value (method \u201Cfdr\u201D)\n        </label></div>\n        <div><label>\n            <input type="radio" ng-model="criteria" value="logfold"> log fold-change\n        </label></div>\n        <div><label>\n            <input type="radio" ng-model="criteria" value="ttest"> t-statistic\n        </label></div>\n    </fieldset>\n</div>\n');
$templateCache.put('src/containers/templates/summaryStatistics.html','<table class="sr-summary-table" ng-if="summaryData.summary.length > 0">\n    <thead>\n    <tr>\n        <th>Plot</th>\n        <th>Labels</th>\n        <th>Subset 1</th>\n        <th ng-if="summaryData.summary[0].$$state.value.json.data.length > 1">Subset 2</th>\n    </tr>\n    </thead>\n    <tr ng-repeat="item in summaryData.summary">\n        <td><img ng-src="{{images[item.$$state.value.img]}}" width="300px"></td>\n        <td>\n            <ul ng-repeat="(key, value) in item.$$state.value.json.data[0]">\n                <li>{{key}} : </li>\n            </ul>\n        </td>\n        <td>\n            <ul ng-repeat="(key, value) in item.$$state.value.json.data[0]">\n                <li>{{value}}</li>\n            </ul>\n        </td>\n        <td ng-if="item.$$state.value.json.data.length > 1">\n            <ul ng-repeat="(key, value) in item.$$state.value.json.data[1]">\n                <li>{{value}}</li>\n            </ul>\n        </td>\n    </tr>\n</table>\n');
$templateCache.put('src/containers/templates/tabContainer.html','<div id="heim-tabs" style="margin-top: 25px">\n    <ul>\n        <li class="heim-tab" ng-repeat="tab in tabs">\n            <a href="#{{tab.id}}" ng-style="{\'color\': tab.disabled ? \'grey\' : \'black\', \'pointer-events\': tab.disabled ? \'none\' : null}">\n                {{tab.name}}\n            </a>\n        </li>\n    </ul>\n    <ng-transclude-replace></ng-transclude-replace>\n</div>');
$templateCache.put('src/containers/templates/workflowControls.html','<div class="sr-workflow-controls" ng-transclude></div>\n\n');
$templateCache.put('src/containers/templates/workflowWarnings.html','<div class="sr-warning-box" ng-style="{\'visibility\': visibility}">\n    {{text}}\n</div>\n');
$templateCache.put('src/containers/timeline/timeline.content.html','<div ng-controller="TimelineController" class="main-container">\n\n    <tab-container>\n\n        <workflow-tab tab-name="Fetch Data">\n            <concept-box concept-group="conceptBoxes.datapoints"></concept-box>\n            <br>\n            <br>\n            <fetch-button concept-map="conceptBoxes" allowed-cohorts="[1]"></fetch-button>\n        </workflow-tab>\n\n        <workflow-tab tab-name="Run Analysis">\n            <run-button button-name="Create Plot" results-storage="scriptResults" script-to-run="run" parameter-map="params"></run-button>\n            <br>\n            <br>\n            <timeline-plot data="scriptResults" width="1200" height="1200"></timeline-plot>\n        </workflow-tab>\n\n    </tab-container>\n\n</div>\n');
$templateCache.put('src/containers/timeline/timeline.html','<div ui-layout="{flow : \'column\'}" class="base-ui-contents">\n    <div ui-layout-container size="20%" min-size="0%">\n        <div ui-view="sidebar"></div>\n    </div>\n\n    <div ui-layout-container min-size="50%">\n        <div ui-view="content"></div>\n    </div>\n</div>\n\n');
$templateCache.put('src/containers/volcanoplot/volcanoplot.content.html','<div ng-controller="VolcanoplotController" class="main-container">\n\n    <tab-container>\n\n        <workflow-tab tab-name="Fetch Data" disabled="fetch.disabled">\n            <concept-box style="display: inline-block" concept-group="fetch.conceptBoxes.highDimensional" type="HD" min="1" max="-1" label="High Dimensional Variables" tooltip="Select high dimensional data node(s) from the Data Set Explorer Tree and drag it into the box.\n                             The nodes needs to be from the same platform.">\n            </concept-box>\n            <br>\n            <br>\n            <fetch-button concept-map="fetch.conceptBoxes" loaded="fetch.loaded" running="fetch.running" allowed-cohorts="[2]">\n            </fetch-button>\n        </workflow-tab>\n\n        <workflow-tab tab-name="Run Analysis" disabled="runAnalysis.disabled">\n            <run-button button-name="Create Plot" store-results-in="runAnalysis.scriptResults" script-to-run="run" arguments-to-use="runAnalysis.params" filename="volcanoplot.json" running="runAnalysis.running">\n            </run-button>\n            <br>\n            <br>\n            <volcano-plot data="runAnalysis.scriptResults" width="1000" height="800"></volcano-plot>\n        </workflow-tab>\n\n    </tab-container>\n\n</div>\n');
$templateCache.put('src/containers/volcanoplot/volcanoplot.html','<div ui-layout="{flow : \'column\'}" class="base-ui-contents">\n    <div ui-layout-container size="20%" min-size="0%">\n        <div ui-view="sidebar"></div>\n    </div>\n\n    <div ui-layout-container min-size="50%">\n        <div ui-view="content"></div>\n    </div>\n</div>\n\n');}]);
//# sourceURL=correlation.js

'use strict';

angular.module('smartRApp').controller('CorrelationController',
    ['$scope', 'smartRUtils', 'commonWorkflowService', function($scope, smartRUtils, commonWorkflowService) {

        commonWorkflowService.initializeWorkflow('correlation', $scope);

        $scope.fetch = {
            disabled: false,
            running: false,
            loaded: false,
            conceptBoxes: {
                datapoints: {concepts: [], valid: false},
                annotations: {concepts: [], valid: true}
            }
        };

        $scope.runAnalysis = {
            disabled: true,
            running: false,
            scriptResults: {},
            params: {
                method: 'pearson',
                transformation: 'raw'
            }
        };

        $scope.$watch('runAnalysis.params.transformation', function(newValue, oldValue) {
            // spearman and kendall are resistant to log transformation. Therefor the default to spearman if log used
            if (newValue !== oldValue && newValue !== 'raw' && $scope.runAnalysis.params.method === 'pearson') {
                $scope.runAnalysis.params.method = 'spearman';
            }
        });

        $scope.$watchGroup(['fetch.running', 'runAnalysis.running'],
            function(newValues) {
                var fetchRunning = newValues[0],
                    runAnalysisRunning = newValues[1];

                // clear old results
                if (fetchRunning) {
                    $scope.runAnalysis.scriptResults = {};
                }

                // disable tabs when certain criteria are not met
                $scope.fetch.disabled = runAnalysisRunning;
                $scope.runAnalysis.disabled = fetchRunning || !$scope.fetch.loaded;
            }
        );

    }]);


//# sourceURL=heatmap.js

'use strict';

angular.module('smartRApp').controller('HeatmapController', [
    '$scope',
    'commonWorkflowService',
    'smartRUtils',
    function($scope, commonWorkflowService, smartRUtils) {

        commonWorkflowService.initializeWorkflow('heatmap', $scope);

        // ------------------------------------------------------------- //
        // Fetch data                                                    //
        // ------------------------------------------------------------- //
        $scope.fetch = {
            disabled: false,
            running: false,
            loaded: false,
            conceptBoxes: {
                highDimensional: {concepts: [], valid: false},
                numeric: {concepts: [], valid: true},
                categoric: {concepts: [], valid: true}
            },
            selectedBiomarkers: [],
            scriptResults: {},
            images: {}
        };

        // ------------------------------------------------------------- //
        // Preprocess                                                    //
        // ------------------------------------------------------------- //
        $scope.preprocess = {
            disabled: true,
            running: false,
            params:  {
                aggregate: false
            },
            scriptResults: {}
        };

        // ------------------------------------------------------------- //
        // Run Heatmap                                                   //
        // ------------------------------------------------------------- //
        $scope.runAnalysis = {
            disabled: true,
            running: false,
            params: {
                max_row: 100,
                sorting: 'nodes',
                ranking: 'coef',
                geneCardsAllowed: false,
            },
            download: {
                disabled: true
            },
            scriptResults: {}
        };

        $scope.common = {
            totalSamples: 0,
            numberOfRows: 0,
            subsets: 0
        };

        $scope.$watchGroup(['fetch.running', 'preprocess.running', 'runAnalysis.running'], function(newValues) {
            var fetchRunning = newValues[0],
                preprocessRunning = newValues[1],
                runAnalysisRunning = newValues[2];

            // clear old results
            if (fetchRunning) {
                $scope.preprocess.scriptResults = {};
                $scope.runAnalysis.scriptResults = {};
                $scope.runAnalysis.params.ranking = '';
                $scope.common.subsets = smartRUtils.countCohorts();
            }

            // clear old results
            if (preprocessRunning) {
                $scope.runAnalysis.scriptResults = {};
                $scope.runAnalysis.params.ranking = '';
                $scope.common.subsets = smartRUtils.countCohorts();
            }

            // disable tabs when certain criteria are not met
            $scope.fetch.disabled = preprocessRunning || runAnalysisRunning;
            $scope.preprocess.disabled = fetchRunning || runAnalysisRunning || !$scope.fetch.loaded;
            $scope.runAnalysis.disabled = fetchRunning || preprocessRunning || !$scope.fetch.loaded;

            // disable buttons when certain criteria are not met
            $scope.runAnalysis.download.disabled = runAnalysisRunning ||
                $.isEmptyObject($scope.runAnalysis.scriptResults);

            // set ranking criteria
            if (!fetchRunning &&
                !preprocessRunning &&
                $scope.common.totalSamples < 2 &&
                $scope.runAnalysis.params.ranking === '') {
                $scope.runAnalysis.params.ranking = 'mean';
            } else if (!fetchRunning &&
                       !preprocessRunning &&
                       $scope.common.subsets < 2 &&
                       $scope.runAnalysis.params.ranking === '') {
                $scope.runAnalysis.params.ranking = 'coef';
            } else if (!fetchRunning &&
                       !preprocessRunning &&
                       $scope.common.subsets > 1 &&
                       $scope.runAnalysis.params.ranking === '') {
                $scope.runAnalysis.params.ranking = 'adjpval';
            }
        });
    }]);


angular.module('smartRApp').controller('TimelineController',
    ['$scope', 'smartRUtils', 'commonWorkflowService', function($scope, smartRUtils, commonWorkflowService) {

        commonWorkflowService.initializeWorkflow('timeline', $scope);

        // model
        $scope.conceptBoxes = {datapoints:{concepts:[]}};
        $scope.scriptResults = {};
        $scope.params = {};
    }]);

//# sourceURL=volcanoplot.js

'use strict';

angular.module('smartRApp').controller('VolcanoplotController', [
    '$scope',
    'smartRUtils',
    'commonWorkflowService',
    function($scope, smartRUtils, commonWorkflowService) {

        commonWorkflowService.initializeWorkflow('volcanoplot', $scope);

        $scope.fetch = {
            disabled: false,
            running: false,
            loaded: false,
            conceptBoxes: {
                highDimensional: {concepts: [], valid: false}
            }
        };

        $scope.runAnalysis = {
            params: {},
            disabled: true,
            running: false,
            scriptResults: {}
        };

        $scope.$watchGroup(['fetch.running', 'runAnalysis.running'], function(newValues) {
            var fetchRunning = newValues[0],
                runAnalysisRunning = newValues[1];

            // clear old results
            if (fetchRunning) {
                $scope.runAnalysis.scriptResults = {};
            }

            // disable tabs when certain criteria are not met
            $scope.fetch.disabled = runAnalysisRunning;
            $scope.runAnalysis.disabled = fetchRunning || !$scope.fetch.loaded;
        });

    }]);


//# sourceURL=biomarkerSelection.js

'use strict';

angular.module('smartRApp').directive('biomarkerSelection', ['$rootScope','EndpointService', '$http',
    function($rootScope, EndpointService, $http) {

    return {
        restrict: 'E',
        scope: {
            biomarkers: '='
        },
        templateUrl:  'src/containers/templates/biomarkerSelection.html',
        controller: ["$scope", function ($scope) {
            if (!$scope.biomarkers) {
                $scope.biomarkers = [];
            }

            var input = $('#heim-input-txt-identifier');
            input.autocomplete({
                source: function(request, response) {
                    var term = request.term;
                    if (term.length < 2) {
                        return function() {
                            return response({rows: []});
                        };
                    }
                    return getIdentifierSuggestions(
                        term,
                        function(grailsResponse) {
                            // convert Grails response to what jqueryui expects
                            // grails response looks like this:
                            // { "id": 1842083, "source": "", "keyword": "TPO", "synonyms":
                            // "(TDH2A, MSA, TPX)", "category": "GENE", "display": "Gene" }
                            var r = [];
                            grailsResponse.rows.forEach(function(v) {
                                r.push({
                                    label: v.keyword,
                                    value: v
                                });
                            });
                            return response(r);
                        }
                    );
                },
                minLength: 2
            });
            input.data('ui-autocomplete')._renderItem = function(ul, item) {
                var value = item.value;
                return jQuery('<li class="ui-menu-item" role="presentation">' +
                    '<a class="ui-corner-all">' +
                    '<span class="category-gene">' + value.display + '&gt;</span>&nbsp;' +
                    '<b>' + value.keyword + '</b>&nbsp;' + value.synonyms + '</a></li>').appendTo(ul);
            };
            input.on('autocompleteselect',
                function(event, ui) {
                    var v = ui.item.value;

                    // check if the item is not in the list yet
                    if ($scope.biomarkers.filter(function(b) {
                                return b.id == v.id;
                            }).length == 0) {

                        // add the biomarker to the list
                        $scope.biomarkers.push({
                            id: v.id,
                            type: v.display,
                            name: v.keyword,
                            synonyms: v.synonyms
                        });
                        $scope.$apply();
                    }
                    this.value = '';
                    return false;
                }
            );
            input.on('autocompletefocus',
                function(event, ui) {
                    var v = ui.item.value;
                    this.value = v.display + ' ' + v.keyword;
                    return false;
                }
            );

            var getIdentifierSuggestions = (function() {
                var baseURL = EndpointService.getMasterEndpoint().url;
                var headers = EndpointService.getMasterEndpoint().restangular.defaultHeaders;
                var curXHR = null;

                return function(term, response) {
                    if (curXHR && curXHR.state() === 'pending') {
                        curXHR.abort();
                    }

                    curXHR = $http({
                        url: baseURL + "/search/loadSearchPathways?query=" + term,
                        headers: headers
                    });

                    curXHR.finally(function() { curXHR = null; });
                    return curXHR.then(
                        function(data) {
                            data = data.data;
                            data = data.substring(5, data.length - 1);  // loadSearchPathways returns String with null (JSON).
                                                                        // This strips it off
                            response(JSON.parse(data));
                        },
                        function() {
                            response({rows: []}); // response must be called even on failure
                        }
                    );
                };
            })();

            $scope.removeIdentifier = function(item) {
                var index = $scope.biomarkers.indexOf(item);
                if (index >= 0) {
                    $scope.biomarkers.splice(index, 1);
                }
            }

        }]

    };
}]);

//# sourceURL=capturePlotButton.js

'use strict';

angular.module('smartRApp').directive('capturePlotButton', [function() {

    // aux for downloadSVG
    var copyWithCollapsedCSS = function(svgElement) {
        var relevantProperties = [
            'fill-opacity', 'fill', 'stroke', 'font-size', 'font-family',
            'shape-rendering', 'stroke-width'
        ];
        var clonedSvg = jQuery(svgElement).clone().attr('display', 'none');
        clonedSvg.insertAfter(svgElement);

        var cachedDefaults = {};
        var scratchSvg = jQuery(document.createElement('svg'))
            .attr('display', 'none')
            .appendTo(jQuery('body'));

        function getDefaultsForElement(jqElement) {
            var nodeName = jqElement.prop('nodeName');
            if (!cachedDefaults[nodeName]) {
                var newElement = jQuery(document.createElement(nodeName))
                    .appendTo(scratchSvg);

                cachedDefaults[nodeName] = window.getComputedStyle(newElement[0]);
            }
            return cachedDefaults[nodeName];
        }

        clonedSvg.find('*').each(function(idx, element) { // for each element in <svg>
            var computedStyle = window.getComputedStyle(element);

            var jqElem = jQuery(element);
            relevantProperties.forEach(function(property) { // for each property
                var effectiveStyle = computedStyle.getPropertyValue(property);
                var defaultStyle = getDefaultsForElement(jqElem).getPropertyValue(property);

                if (effectiveStyle !== defaultStyle) {
                    jqElem.attr(property, effectiveStyle);
                }
            });
        });

        scratchSvg.remove();

        return clonedSvg;
    };

    var downloadSVG = function(svgElement, fileName) {
        var serializer = new XMLSerializer();
        var clonedSvg = copyWithCollapsedCSS(svgElement);
        var xmlString = serializer.serializeToString(clonedSvg[0]);
        var blob = new Blob([xmlString], { type: 'image/svg+xml' });
        var svgBlobUrl = URL.createObjectURL(blob);
        var link = jQuery('<a/>')
            .attr('href', svgBlobUrl)
            .attr('download', fileName)
            .css('display', 'none');
        jQuery('body').append(link);
        link[0].click();
        link.remove();
        URL.revokeObjectURL(svgBlobUrl);
        clonedSvg.remove();
    };

    return {
        restrict: 'E',
        scope: {
            disabled: '=',
            filename: '@'
        },
        template:
            '<input type="button" value="Capture" class="heim-action-button" ng-click="capture()">',
        link: function(scope, elements) {

            var template_btn = elements.children()[0];
            template_btn.disabled = scope.disabled;

            scope.$watch('disabled', function (newValue) {
                template_btn.disabled = newValue;
            }, true);

            if (!scope.filename) {
                // default filename
                scope.filename = 'image.svg';
            }

            scope.capture = function() {
                var svgElement = jQuery('svg.visualization')[0];
                downloadSVG(svgElement, scope.filename);
            };

        }
    };
}]);

//# sourceURL=cohortSummaryInfo.js

'use strict';

angular.module('smartRApp').directive('cohortSummaryInfo', [function() {

    return {
        restrict: 'E',
        template: '<span id="sr-cohort-selection" style="font-size: 11px;"></span>',
        controller: ["$scope", "$element", function($scope, $element) {
            var span = $element.children()[0];

            function _showCohortInfo() {
                var cohortsSummary = '';

                for(var i = 1; i <= GLOBAL.NumOfSubsets; i++) {
                    var currentQuery = getQuerySummary(i);
                    if(currentQuery !== '') {
                        cohortsSummary += '<br/>Subset ' + (i) + ': <br/>';
                        cohortsSummary += currentQuery;
                        cohortsSummary += '<br/>';
                    }
                }
                if (!cohortsSummary) {
                    cohortsSummary = '<br/>WARNING: No subsets have been selected! Please go to the "Comparison" tab and select your subsets.';
                }

                span.innerHTML = cohortsSummary;
            }

            // Trigger for update is clicking the SmartR panel item. Maybe there is a more elegant way?
            $scope.$evalAsync(function() {
                _showCohortInfo(); // set it one time initially
                $('#resultsTabPanel__smartRPanel').on('click', function() {
                    _showCohortInfo();
                });
            });
        }]
    };

}]);

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
            templateUrl: 'src/containers/templates/conceptBox.html',
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
                    HIGH_DIMENSIONAL: 'HD',
                    CATEGORICAL_OPTION: 'LD-categorical',
                    NUMERIC: 'LD-numerical'
                };

                var _containsOnlyCorrectType = function () {
                    if (scope.type === undefined) return true;
                    var correct = true;
                    scope.conceptGroup.concepts.forEach(function (conceptObj) {
                        if (scope.type !== typeMap[conceptObj.type]) {
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

//# sourceURL=downloadResultsButton.js

angular.module('smartRApp').directive('downloadResultsButton', ['rServeService', function(rServeService)
{
    function downloadFile(data) {
        var link = jQuery('<a/>')
            .attr('href', rServeService.urlForFile(data.executionId, 'analysis_data.zip'))
            .attr('download', 'analysis_data.zip')
            .css('display', 'none');
        jQuery('body').append(link);
        link[0].click();
        link.remove();
    }

    return {
        restrict: 'E',
        scope: {
            disabled: '='
        },
        template:
            '<input type="button" value="Download" class="heim-action-button">' +
            '<span style="padding-left: 10px;"></span>',
        link: function(scope, element) {

            var template_btn = element.children()[0];
            var template_msg = element.children()[1];

            template_btn.disabled = scope.disabled;

            scope.$watch('disabled', function (newValue) {
                template_btn.disabled = newValue;
            }, true);

            template_btn.onclick = function() {

                template_msg.innerHTML = 'Download data, please wait <span class="blink_me">_</span>';

                rServeService.startScriptExecution({
                    taskType: 'downloadData',
                    arguments: {}
                }).then(
                    function (data){
                        // download file
                        template_msg.innerHTML = '';
                        downloadFile(data);
                    },
                    function (msg){
                        template_msg.innerHTML = 'Failure: ' + msg;
                    }
                )
            };
        }
    };
}]);

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
            templateUrl: 'src/containers/templates/fetchButton.html',
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

//# sourceURL=ngTranscludeReplace.js

'use strict';

angular.module('smartRApp').directive('ngTranscludeReplace', ['$log', function ($log) {
    return {
        terminal: true,
        restrict: 'EA',

        link: function ($scope, $element, $attr, ctrl, transclude) {
            if (!transclude) {
                $log.error('orphan',
                    'Illegal use of ngTranscludeReplace directive in the template! ' +
                    'No parent directive that requires a transclusion found. ');
                return;
            }
            transclude(function (clone) {
                if (clone.length) {
                    $element.replaceWith(clone);
                }
                else {
                    $element.remove();
                }
            });
        }
    };
}]);

//# sourceURL=preprocessButton.js

'use strict';

angular.module('smartRApp').directive('preprocessButton', [
    'rServeService',
    '$rootScope',
    function(rServeService, $rootScope) {
        return {
            restrict: 'E',
            scope: {
                running: '=?',
                params: '=?',
                showSummaryStats: '=',
                summaryData: '=',
                allSamples: '=?',
                numberOfRows: '=?',
                projection: '@?'
            },
            templateUrl:  'src/containers/templates/preprocessButton.html',
            link: function(scope, element) {

                var template_btn = element.children()[0];
                var template_msg = element.children()[1];

                var _onSuccess = function() {
                    template_msg.innerHTML = 'Task complete! Go to the "Run Analysis" tab to continue.';
                    template_btn.disabled = false;
                    scope.running = false;
                };

                var _onFail = function(msg) {
                    template_msg.innerHTML = 'Error: ' + msg;
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

                var _showSummaryStats = function() {
                    template_msg.innerHTML = 'Execute summary statistics, please wait <span class="blink_me">_</span>';
                    rServeService.executeSummaryStats('preprocess', scope.projection).then(
                        function (data) {
                            scope.summaryData = data.result; // this will trigger $watch
                        },
                        _onFail
                    );
                };

                template_btn.onclick = function() {
                    scope.summaryData = {};
                    scope.disabled = true;
                    scope.running = true;
                    template_msg.innerHTML = 'Preprocessing, please wait <span class="blink_me">_</span>';

                    var params = scope.params ? scope.params : {};
                    rServeService.preprocess(params).then(
                        scope.showSummaryStats ? _showSummaryStats : _onSuccess,
                        _onFail
                    );
                };
            }
        };
    }]);

//# sourceURL=runButton.js

'use strict';

angular.module('smartRApp').directive('runButton', [
    '$rootScope',
    'rServeService',
    'smartRUtils',
    function($rootScope, rServeService, smartRUtils) {
        return {
            restrict: 'E',
            scope: {
                running: '=?',
                storage: '=storeResultsIn',
                script: '@scriptToRun',
                name: '@buttonName',
                filename: '@?',
                params: '=?argumentsToUse'
            },
            templateUrl:  'src/containers/templates/runButton.html',
            link: function(scope, element) {
                var params = scope.params ? scope.params : {};

                var template_btn = element.children()[0],
                    template_msg = element.children()[1];

                var _onSuccess = function(data) {
                    scope.storage = data;
                    template_msg.innerHTML = '';
                    template_btn.disabled = false;
                    scope.disabled = false;
                    scope.running = false;
                };

                var _onFail = function(msg) {
                    template_msg.innerHTML = 'Error: ' + msg;
                    template_btn.disabled = false;
                    scope.disabled = false;
                    scope.running = false;
                };

                var _prepareResults = function(response) {
                    if (scope.filename) {
                        // when filename is specified it is assumed that results are serialized
                        // if results are serialized, we need to deserialized them by
                        // downloading the results files.
                        rServeService.downloadJsonFile(response.executionId, scope.filename).then(
                            function(d) { _onSuccess(d.data); },
                            _onFail
                        );
                    } else {
                        _onSuccess(JSON.parse(response.result.artifacts.value));
                    }
                };

                template_btn.onclick = function() {
                    smartRUtils.cleanUp();
                    template_btn.disabled = true;
                    scope.storage = {};
                    scope.disabled = true;
                    scope.running = true;
                    template_msg.innerHTML = 'Creating plot, please wait <span class="blink_me">_</span>';

                    rServeService.startScriptExecution({
                        taskType: scope.script,
                        arguments: params
                    }).then(
                        _prepareResults,
                        _onFail
                    );
                };
            }
        };
    }]);

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
            templateUrl:   'src/containers/templates/summaryStatistics.html'
        };
    }
]);

//# sourceURL=tabContainer.js

'use strict';

angular.module('smartRApp').directive('tabContainer',
    ['$rootScope', 'smartRUtils', '$timeout', function($rootScope, smartRUtils, $timeout) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl:  'src/containers/templates/tabContainer.html',
            controller: ["$scope", function($scope) {
                $scope.tabs = [];
                this.addTab = function(tab) {
                    $scope.tabs.push(tab);
                };
            }],
            link: function() {
                $timeout(function() { // init jQuery UI tabs after DOM has rendered
                    $('#heim-tabs').tabs();
                });
            }
        };
    }]);

//# sourceURL=workflowControls.js

'use strict';

angular.module('smartRApp').directive('workflowControls', [
    '$rootScope',
    function($rootScope) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl:  'src/containers/templates/workflowControls.html'
        };
    }
]);

//# sourceURL=workflowTab.js

'use strict';

angular.module('smartRApp').directive('workflowTab', ['smartRUtils', function(smartRUtils) {
    return {
        restrict: 'E',
        scope: {
            name: '@tabName',
            disabled: '='
        },
        require: '^tabContainer',
        transclude: true,
        template: '<ng-transclude-replace></ng-transclude-replace>',
        link: function(scope, element, attrs, tabContainerCtrl) {
            var id = 'fragment-' + smartRUtils.makeSafeForCSS(scope.name);
            scope.id = id;
            element[0].id = id;
            tabContainerCtrl.addTab(scope);
        }
    };
}]);

//# sourceURL=workflowWarnings.js

'use strict';

angular.module('smartRApp').directive('workflowWarnings', [
    '$rootScope',
    function($rootScope) {
        return {
            restrict: 'E',
            scope: {
                warnings: '='
            },
            templateUrl:  'src/containers/templates/workflowWarnings.html',
            link: function(scope) {
                scope.$watch('warnings', function() {
                    scope.visibility = $.isEmptyObject(scope.warnings) ? 'hidden' : 'visible';
                    scope.text = '';
                    for (var warn in scope.warnings) {
                        if (scope.warnings.hasOwnProperty(warn)) {
                            scope.text += scope.warnings[warn] + '\n';
                        }
                    }
                }, true);
            }
        };
    }
]);

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

//# sourceURL=smartRUtils.js

'use strict';

angular.module('smartRApp').factory('smartRUtils', ['$q', 'CohortSharingService', function($q,
                                                                                           CohortSharingService) {

    var service = {};

    var nodeToKey = function (node) {
        return node.restObj.key;
    };

    service.conceptBoxMapToConceptKeys = function smartRUtils_conceptBoxMapToConceptKeys(conceptBoxMap) {
        var allConcepts = {};
        Object.keys(conceptBoxMap).forEach(function(group) {
            var concepts = conceptBoxMap[group].concepts;
            concepts.forEach(function(concept, idx) {
                allConcepts[group + '_' + 'n' + idx] = nodeToKey(concept);
            });
        });
        return allConcepts;
    };

    /**
     * Creates a CSS safe version of a given string
     * This should be used consistently across the whole of SmartR to avoid data induced CSS errors
     *
     * @param str
     * @returns {string}
     */
    service.makeSafeForCSS = function smartRUtils_makeSafeForCSS(str) {
        return String(str).replace(/[^a-z0-9]/g, function(s) {
            var c = s.charCodeAt(0);
            if (c === 32) {
                return '-';
            }
            if (c >= 65 && c <= 90) {
                return '_' + s.toLowerCase();
            }
            return '__' + ('000' + c.toString(16)).slice(-4);
        });
    };

    service.getElementWithoutEventListeners = function(cssSelector) {
        var element = document.getElementById(cssSelector);
        var copy = element.cloneNode(true);
        element.parentNode.replaceChild(copy, element);
        return copy;
    };

    service.shortenConcept = function smartRUtils_shortenConcept(concept) {
        var split = concept.split('\\');
        split = split.filter(function(str) { return str !== ''; });
        return split[split.length - 2] + '/' + split[split.length - 1];
    };

    // Calculate width of text from DOM element or string. By Phil Freo <http://philfreo.com>
    $.fn.textWidth = function(text, font) {
        if (!$.fn.textWidth.fakeEl) {
            $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
        }
        $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
        return $.fn.textWidth.fakeEl.width();
    };

    service.getTextWidth = function(text, font) {
        return $.fn.textWidth(text, font);
    };

    /**
     * Executes callback with scroll position when SmartR mainframe is scrolled
     * @param function
     */
    service.callOnScroll = function(callback) {
        $('#sr-index').parent().scroll(function() {
            var scrollPos = $(this).scrollTop();
            callback(scrollPos);
        });
    };

    service.prepareWindowSize = function(width, height) {
        $('#heim-tabs').css('min-width', parseInt(width) + 25);
        $('#heim-tabs').css('min-height', parseInt(height) + 25);
    };

    /**
    * removes all kind of elements that might live out of the viz directive (e.g. tooltips, contextmenu, ...)
    */
    service.cleanUp = function() {
        $('.d3-tip').remove();
    };

    service.countCohorts = function() {
        return CohortSharingService.getSelection().length;
    };

    service.getSubsetIds = function smartRUtil_getSubsetIds() {
        var defer = $q.defer();
        defer.resolve(CohortSharingService.getSelection());
        return defer.promise;
    };

    return service;
}]);


'use strict';

angular.module('smartRApp').controller('BoxplotController', [
    '$scope',
    'smartRUtils',
    'commonWorkflowService',
    function($scope, smartRUtils, commonWorkflowService) {

        commonWorkflowService.initializeWorkflow('boxplot', $scope);

        $scope.fetch = {
            running: false,
            disabled: false,
            loaded: false,
            conceptBoxes: {
                datapoints: {concepts: [], valid: false}
            }
        };

        $scope.runAnalysis = {
            running: false,
            disabled: true,
            scriptResults: {},
            params: {}
        };

        $scope.$watchGroup(['fetch.running', 'runAnalysis.running'],
            function(newValues) {
                var fetchRunning = newValues[0],
                    runAnalysisRunning = newValues[1];

                // clear old results
                if (fetchRunning) {
                    $scope.runAnalysis.scriptResults = {};
                }

                // disable tabs when certain criteria are not met
                $scope.fetch.disabled = runAnalysisRunning;
                $scope.runAnalysis.disabled = fetchRunning || !$scope.fetch.loaded;
            }
        );

    }]);


angular.module('smartRApp').directive('boxplot', [
    'smartRUtils',
    'rServeService',
    '$rootScope',
    function(smartRUtils, rServeService, $rootScope) {

        return {
            restrict: 'E',
            scope: {
                data: '=',
                width: '@',
                height: '@'
            },
            templateUrl:  'src/containers/templates/boxplot.html',
            link: function (scope, element) {
                var template_ctrl = element.children()[0],
                    template_viz = element.children()[1];
                /**
                 * Watch data model (which is only changed by ajax calls when we want to (re)draw everything)
                 */
                scope.$watch('data', function () {
                    $(template_viz).empty();
                    if (! $.isEmptyObject(scope.data)) {
                        smartRUtils.prepareWindowSize(scope.width, scope.height);
                        scope.showControls = true;
                        createBoxplot(scope, template_viz, template_ctrl);
                    }
                });
            }
        };

        function createBoxplot(scope, root) {
            var concept = '',
                globalMin = Number.MIN_VALUE,
                globalMax = Number.MAX_VALUE,
                categories = [],
                excludedPatientIDs = [],
                useLog = false;
            function setData(data) {
                concept = data.concept[0];
                globalMin = data.globalMin[0];
                globalMax = data.globalMax[0];
                categories = data['Subset 2'] ? ['Subset 1', 'Subset 2'] : ['Subset 1'];
                excludedPatientIDs = data.excludedPatientIDs;
                useLog = data.useLog[0];
            }
            setData(scope.data);

            var removeBtn = smartRUtils.getElementWithoutEventListeners('sr-boxplot-remove-btn');
            removeBtn.addEventListener('click', removeOutliers);

            var resetBtn = smartRUtils.getElementWithoutEventListeners('sr-boxplot-reset-btn');
            resetBtn.addEventListener('click', reset);

            var kdeCheck = smartRUtils.getElementWithoutEventListeners('sr-boxplot-kde-check');
            kdeCheck.addEventListener('change', function() { swapKDE(kdeCheck.checked); });
            kdeCheck.checked = false;

            var jitterCheck = smartRUtils.getElementWithoutEventListeners('sr-boxplot-jitter-check');
            jitterCheck.addEventListener('change', function() { swapJitter(jitterCheck.checked); });
            jitterCheck.checked = false;

            var logCheck = smartRUtils.getElementWithoutEventListeners('sr-boxplot-log-check');
            logCheck.checked = useLog;
            logCheck.addEventListener('change', function() { swapLog(logCheck.checked); });

            var animationDuration = 1000;

            var width = parseInt(scope.width);
            var height = parseInt(scope.height);
            var margin = {top: 20, right: 60, bottom: 200, left: 280};

            var boxWidth = 0.12 * width;
            var whiskerLength = boxWidth / 6;

            var colorScale = d3.scale.quantile()
                .range(['rgb(158,1,66)', 'rgb(213,62,79)', 'rgb(244,109,67)', 'rgb(253,174,97)', 'rgb(254,224,139)', 'rgb(255,255,191)', 'rgb(230,245,152)', 'rgb(171,221,164)', 'rgb(102,194,165)', 'rgb(50,136,189)', 'rgb(94,79,162)']);

            var boxplot = d3.select(root).append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            var x = d3.scale.ordinal()
                .domain(categories)
                .rangeBands([0, width], 1, 0.5);

            var y = d3.scale.linear()
                .domain([globalMin, globalMax])
                .range([height, 0]);

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient('left');

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient('bottom');

            boxplot.append('g')
                .attr('class', 'y axis')
                .attr('transform', 'translate(' + 0 + ',' + 0 + ')')
                .call(yAxis);

            boxplot.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(' + 0 + ',' + (height + 20) + ')')
                .call(xAxis)
                .selectAll('text')
                .attr('dy', '.35em')
                .attr('transform', 'translate(' + 0 + ',' + 5 + ')rotate(45)')
                .style('text-anchor', 'start');

            boxplot.append('text')
                .attr('transform', 'translate(' + (-40) + ',' + (height / 2) + ')rotate(-90)')
                .attr('text-anchor', 'middle')
                .text(smartRUtils.shortenConcept(concept) + (useLog ? ' (log2)' : ''));

            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function(d) { return d; });

            boxplot.call(tip);

            var brush = d3.svg.brush()
                .x(d3.scale.identity().domain([0, width]))
                .y(d3.scale.identity().domain([-5, height + 5]))
                .on('brush', function () {
                    contextMenu.hide();
                    updateSelection();
                });

            boxplot.append('g')
                .attr('class', 'brush')
                .on('mousedown', function () {
                    if (d3.event.button === 2) {
                        d3.event.stopImmediatePropagation();
                    }
                })
                .call(brush);

            var contextMenu = d3.tip()
                .attr('class', 'd3-tip sr-contextmenu')
                .html(function(d) { return d; });

            boxplot.call(contextMenu);

            function _addEventListeners() {
                smartRUtils.getElementWithoutEventListeners('sr-boxplot-exclude-btn').addEventListener('click', function() {
                    contextMenu.hide();
                    excludeSelection();
                });

                smartRUtils.getElementWithoutEventListeners('sr-boxplot-reset-btn-2').addEventListener('click', function() {
                    contextMenu.hide();
                    reset();
                });
            }

            boxplot.on('contextmenu', function () {
                d3.event.preventDefault();
                contextMenu.show('<input id="sr-boxplot-exclude-btn" value="Exclude" class="sr-ctx-menu-btn"><br/>' +
                    '<input id="sr-boxplot-reset-btn-2" value="Reset" class="sr-ctx-menu-btn">');
                _addEventListeners();
            });

            var currentSelection;
            function updateSelection() {
                d3.selectAll('.point').classed('brushed', false);
                var extent = brush.extent();
                var left = extent[0][0],
                    top = extent[0][1],
                    right = extent[1][0],
                    bottom = extent[1][1];
                currentSelection = d3.selectAll('.point')
                    .filter(function (d) {
                        var point = d3.select(this);
                        return y(d.value) >= top && y(d.value) <= bottom && point.attr('cx') >= left && point.attr('cx') <= right;
                    })
                    .classed('brushed', true)
                    .map(function(d) { return d.patientID; });
            }

            function excludeSelection() {
                excludedPatientIDs = excludedPatientIDs.concat(currentSelection);
                var settings = { excludedPatientIDs: excludedPatientIDs, useLog: logCheck.checked };

                rServeService.startScriptExecution({
                    taskType: 'run',
                    arguments: settings
                }).then(
                    function (response) {
                        removePlot();
                        scope.data = JSON.parse(response.result.artifacts.value);
                    },
                    function (response) {
                        console.error(response);
                    }
                );
            }

            function removePlot() {
                d3.select(root).selectAll('*').remove();
                d3.selectAll('.d3-tip').remove();
            }

            function removeOutliers() {
                currentSelection = d3.selectAll('.outlier').map(function (d) { return d.patientID; });
                if (currentSelection) { excludeSelection(); }
            }

            function kernelDensityEstimator(kernel, x) {
                return function (sample) {
                    return x.map(function (x) {
                        return [x, d3.mean(sample, function (v) {
                            return kernel(x - v);
                        })];
                    });
                };
            }

            function epanechnikovKernel(scale) {
                return function (u) {
                    return Math.abs(u /= scale) <= 1 ? 0.75 * (1 - u * u) / scale : 0;
                };
            }

            // function gaussKernel(scale) {
            //     return function (u) {
            //         return Math.exp(-u * u / 2) / Math.sqrt(2 * Math.PI) / scale;
            //     };
            // }

            function swapKDE(checked) {
                if (!checked) {
                    d3.selectAll('.line').attr('visibility', 'hidden');
                } else {
                    d3.selectAll('.line').attr('visibility', 'visible');
                }
            }

            function shortenNodeLabel(label) {
                label = label.replace(/\W+/g, '');
                return label;
            }

            var jitterWidth = 1.0;

            function swapJitter() {
                categories.forEach(function(category) {
                    d3.selectAll('.point.' + smartRUtils.makeSafeForCSS(shortenNodeLabel(category)))
                        .transition()
                        .duration(animationDuration)
                        .attr('cx', function(d) {
                            return jitterCheck.checked ? x(category) + boxWidth * jitterWidth * d.jitter : x(category);
                        });
                });
            }

            function swapLog() {
                var settings = { excludedPatientIDs: excludedPatientIDs, useLog: logCheck.checked };
                rServeService.startScriptExecution({
                    taskType: 'run',
                    arguments: settings
                }).then(
                    function (response) {
                        removePlot();
                        scope.data = JSON.parse(response.result.artifacts.value);
                    },
                    function (response) {
                        console.error(response);
                    }
                );
            }

            var boxes = {};
            categories.forEach(function(category) {
                boxes[category] = boxplot.append('g');
                var params = scope.data[category];
                createBox(params, category, boxes[category]);
            });

            function createBox(params, category, box) {
                var boxLabel = shortenNodeLabel(category);
                colorScale.domain(d3.extent(y.domain()));

                var whisker = box.selectAll('.whisker')
                    .data([params.upperWhisker, params.lowerWhisker], function (d, i) {
                        return boxLabel + '-whisker-' + i;
                    });

                whisker.enter()
                    .append('line')
                    .attr('class', 'whisker');

                whisker.transition()
                    .duration(animationDuration)
                    .attr('x1', x(category) - whiskerLength / 2)
                    .attr('y1', function (d) { return y(d); })
                    .attr('x2', x(category) + whiskerLength / 2)
                    .attr('y2', function (d) { return y(d); });

                var whiskerLabel = box.selectAll('.whiskerLabel')
                    .data([params.upperWhisker, params.lowerWhisker], function (d, i) {
                        return boxLabel + '-whiskerLabel-' + i;
                    });

                whiskerLabel.enter()
                    .append('text')
                    .attr('class', 'whiskerLabel boxplotValue');

                whiskerLabel.transition()
                    .duration(animationDuration)
                    .attr('x', x(category) + whiskerLength / 2)
                    .attr('y', function (d) { return y(d); })
                    .attr('dx', '.35em')
                    .attr('dy', '.35em')
                    .attr('text-anchor', 'start')
                    .text(function (d) { return d; });

                var hingeLength = boxWidth;
                var hinge = box.selectAll('.hinge')
                    .data([params.upperHinge, params.lowerHinge], function (d, i) {
                        return boxLabel + '-hinge-' + i;
                    });

                hinge.enter()
                    .append('line')
                    .attr('class', 'hinge');

                hinge.transition()
                    .duration(animationDuration)
                    .attr('x1', x(category) - hingeLength / 2)
                    .attr('y1', function (d) { return y(d); })
                    .attr('x2', x(category) + hingeLength / 2)
                    .attr('y2', function (d) { return y(d); });

                var hingeLabel = box.selectAll('.hingeLabel')
                    .data([params.upperHinge, params.lowerHinge], function (d, i) {
                        return boxLabel + '-hingeLabel-' + i;
                    });

                hingeLabel.enter()
                    .append('text')
                    .attr('class', 'hingeLabel boxplotValue');

                hingeLabel.transition()
                    .duration(animationDuration)
                    .attr('x', x(category) - hingeLength / 2)
                    .attr('y', function (d) { return y(d); })
                    .attr('dx', '-.35em')
                    .attr('dy', '.35em')
                    .attr('text-anchor', 'end')
                    .text(function (d) { return d; });

                var connection = box.selectAll('.connection')
                    .data([[params.upperWhisker, params.upperHinge], [params.lowerWhisker, params.lowerHinge]],
                        function (d, i) { return boxLabel + '-connection-' + i; });

                connection.enter()
                    .append('line')
                    .attr('class', 'connection');

                connection.transition()
                    .duration(animationDuration)
                    .attr('x1', x(category))
                    .attr('y1', function (d) { return y(d[0]); })
                    .attr('x2', x(category))
                    .attr('y2', function (d) { return y(d[1]); });

                var upperBox = box.selectAll('.box.upper')
                    .data(params.upperHinge, function (d) { return d; });

                upperBox.enter()
                    .append('rect')
                    .attr('class', 'box upper');

                upperBox.transition()
                    .duration(animationDuration)
                    .attr('x', x(category) - hingeLength / 2)
                    .attr('y', y(params.upperHinge))
                    .attr('height', Math.abs(y(params.upperHinge) - y(params.median)))
                    .attr('width', hingeLength);

                var lowerBox = box.selectAll('.box.lower')
                    .data(params.lowerHinge, function (d) { return d; });

                lowerBox.enter()
                    .append('rect')
                    .attr('class', 'box lower');

                lowerBox.transition()
                    .duration(animationDuration)
                    .attr('x', x(category) - hingeLength / 2)
                    .attr('y', y(params.median))
                    .attr('height', Math.abs(y(params.median) - y(params.lowerHinge)))
                    .attr('width', hingeLength);

                var medianLabel = box.selectAll('.medianLabel')
                    .data(params.median, function (d) { return d;});

                medianLabel.enter()
                    .append('text')
                    .attr('class', 'medianLabel boxplotValue');

                medianLabel.transition()
                    .duration(animationDuration)
                    .attr('x', x(category) + hingeLength / 2)
                    .attr('y', function () { return y(params.median); })
                    .attr('dx', '.35em')
                    .attr('dy', '.35em')
                    .attr('text-anchor', 'start')
                    .text(params.median);

                var point = box.selectAll('.point')
                    .data(params.rawData, function (d) { return boxLabel + '-' + d.patientID; });

                point.enter()
                    .append('circle')
                    .attr('cx', function (d) {
                        return jitterCheck.checked ? x(category) + boxWidth * jitterWidth * d.jitter : x(category);
                    })
                    .attr('r', 0)
                    .attr('fill', function (d) { return colorScale(d.value); })
                    .on('mouseover', function (d) {
                        tip.show('Value: ' + d.value + '</br>' +
                            'PatientID: ' + d.patientID + '</br>' +
                            'Outlier: ' + d.outlier);
                    })
                    .on('mouseout', function () {
                        tip.hide();
                    });

                point
                    .attr('class', function (d) {
                        return 'point patientID-' + smartRUtils.makeSafeForCSS(d.patientID) +
                            (d.outlier ? ' outlier ' : ' ') + smartRUtils.makeSafeForCSS(boxLabel);
                    }) // This is here and not in the .enter() because points might become outlier on removal of other points
                    .transition()
                    .duration(animationDuration)
                    .attr('cy', function (d) { return y(d.value); })
                    .attr('r', 3);

                point.exit()
                    .transition()
                    .duration(animationDuration)
                    .attr('r', 0)
                    .remove();

                var yCopy = y.copy();
                yCopy.domain([params.lowerWhisker, params.upperWhisker]);
                var kde = kernelDensityEstimator(epanechnikovKernel(6), yCopy.ticks(100));
                var values = params.rawData.map(function (d) { return d.value; });
                var estFun = kde(values);
                var kdeDomain = d3.extent(estFun, function (d) { return d[1]; });
                var kdeScale = d3.scale.linear()
                    .domain(kdeDomain)
                    .range([0, boxWidth / 2]);
                var lineGen = d3.svg.line()
                    .x(function (d) { return x(category) - kdeScale(d[1]); })
                    .y(function (d) { return y(d[0]); });

                box.append('path')
                    .attr('class', 'line')
                    .attr('visibility', 'hidden')
                    .datum(estFun)
                    .transition()
                    .duration(animationDuration)
                    .attr('d', lineGen);
            }

            function removeBrush() {
                d3.selectAll('.brush')
                    .call(brush.clear());
            }

            function reset() {
                removeBrush();
                excludedPatientIDs = [];
                currentSelection = [];
                excludeSelection(); // Abusing the method because I can
            }

        }

    }]);


angular.module('smartRApp')
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state('boxplot', {
                parent: 'site',
                url: '/boxplot',
                views: {
                    '@': {
                        templateUrl: 'src/containers/boxplot/boxplot.html'
                    },
                    'content@boxplot': {
                        templateUrl: 'src/containers/boxplot/boxplot.content.html',
                        controller: 'BoxplotController',
                        controllerAs: 'vm'
                    },
                    'sidebar@boxplot': {
                        templateUrl: 'app/components/sidebar/sidebar.html',
                        controller: 'SidebarCtrl',
                        controllerAs: 'vm'
                    }
                }
            });
    }]);

angular.module('smartRApp').directive('correlationPlot', [
    'smartRUtils',
    'rServeService',
    function(smartRUtils, rServeService) {

        return {
            restrict: 'E',
            scope: {
                data: '=',
                width: '@',
                height: '@'
            },
            link: function (scope, element) {

                /**
                 * Watch data model (which is only changed by ajax calls when we want to (re)draw everything)
                 */
                scope.$watch('data', function() {
                    $(element[0]).empty();
                    if (! $.isEmptyObject(scope.data)) {
                        smartRUtils.prepareWindowSize(scope.width, scope.height);
                        createCorrelationViz(scope, element[0]);
                    }
                });
            }
        };

        function createCorrelationViz(scope, root) {
            var animationDuration = 500;
            var bins = 10;
            var w = parseInt(scope.width);
            var h = parseInt(scope.height);
            var margin = {top: 20, right: 250, bottom: h / 4 + 230, left: w / 4};
            var width = w * 3 / 4 - margin.left - margin.right;
            var height = h * 3 / 4 - margin.top - margin.bottom;
            var bottomHistHeight = margin.bottom;
            var leftHistHeight = margin.left;
            var colors = ['#33FF33', '#3399FF', '#CC9900', '#CC99FF', '#FFFF00', 'blue'];
            var x = d3.scale.linear()
                .domain(d3.extent(scope.data.points, function(d) { return d.x; }))
                .range([0, width]);
            var y = d3.scale.linear()
                .domain(d3.extent(scope.data.points, function(d) { return d.y; }))
                .range([height, 0]);

            var annotations = scope.data.annotations.sort();
            for (var i = 0; i < annotations.length; i++) {
                var annotation = annotations[i];
                if (annotation === '') {
                    annotations[i] = 'Default';
                }
            }

            var xArrLabel = scope.data.xArrLabel[0];
            var yArrLabel = scope.data.yArrLabel[0];

            var correlation,
                pvalue,
                regLineSlope,
                regLineYIntercept,
                patientIDs,
                points,
                method,
                transformation,
                minX,
                maxX,
                minY,
                maxY;
            function setData(data) {
                correlation = data.correlation[0];
                pvalue = data.pvalue[0];
                regLineSlope = data.regLineSlope[0];
                regLineYIntercept = data.regLineYIntercept[0];
                method = data.method[0];
                transformation = data.transformation[0];
                patientIDs = data.patientIDs;
                points = data.points;
                var xValues =  data.points.map(function(d) { return d.x; });
                var yValues =  data.points.map(function(d) { return d.y; });
                minX = Math.min.apply(null, xValues);
                minY = Math.min.apply(null, yValues);
                maxX = Math.max.apply(null, xValues);
                maxY = Math.max.apply(null, yValues);
            }

            setData(scope.data);

            function updateStatistics(patientIDs, scatterUpdate, init) {
                if (! init) {
                    patientIDs = patientIDs.length !== 0 ? patientIDs : d3.selectAll('.point').data().map(function(d) {
                        return d.patientID;
                    });
                }
                var args = { method: method, transformation: transformation, selectedPatientIDs: patientIDs };

                rServeService.startScriptExecution({
                    taskType: 'run',
                    arguments: args
                }).then(
                    function (response) {
                        var results = JSON.parse(response.result.artifacts.value);
                        if (init) {
                            removePlot();
                            scope.data = results;
                        } else {
                            setData(results);
                            if (scatterUpdate) {
                                updateScatterplot();
                            }
                            updateRegressionLine();
                            updateLegends();
                            updateHistogram();
                        }
                    },
                    function (response) {
                        console.error(response);
                    }
                );
            }

            function removePlot() {
                d3.select(root).selectAll('*').remove();
                d3.selectAll('.d3-tip').remove();
            }

            var svg = d3.select(root).append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .on('contextmenu', function() {
                    d3.event.preventDefault();
                    contextMenu.show('<input id="sr-correlation-zoom-btn" value="Zoom" class="sr-ctx-menu-btn"><br/>' +
                        '<input id="sr-correlation-exclude-btn" value="Exclude" class="sr-ctx-menu-btn"><br/>' +
                        '<input id="sr-correlation-reset-btn" value="Reset" class="sr-ctx-menu-btn">');
                    _addEventListeners();
                });

            function _addEventListeners() {
                smartRUtils.getElementWithoutEventListeners('sr-correlation-zoom-btn').addEventListener('click', function() {
                    contextMenu.hide();
                    zoomSelection();
                });
                smartRUtils.getElementWithoutEventListeners('sr-correlation-exclude-btn').addEventListener('click', function() {
                    contextMenu.hide();
                    excludeSelection();
                });
                smartRUtils.getElementWithoutEventListeners('sr-correlation-reset-btn').addEventListener('click', function() {
                    contextMenu.hide();
                    reset();
                });
            }

            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function(d) { return d; });

            svg.call(tip);

            svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0, 0)')
                .call(d3.svg.axis()
                    .scale(x)
                    .ticks(10)
                    .tickFormat('')
                    .innerTickSize(height)
                    .orient('bottom'));

            svg.append('text')
                .attr('class', 'axisLabels')
                .attr('transform', 'translate(' + width / 2 + ',' + (- 10) + ')')
                .text(smartRUtils.shortenConcept(xArrLabel) + ' (' + transformation + ')');

            svg.append('g')
                .attr('class', 'y axis')
                .attr('transform', 'translate(' + width + ',' + 0 + ')')
                .call(d3.svg.axis()
                    .scale(y)
                    .ticks(10)
                    .tickFormat('')
                    .innerTickSize(width)
                    .orient('left'));

            svg.append('text')
                .attr('class', 'axisLabels')
                .attr('transform', 'translate('  + (width + 10) + ',' + height / 2 + ')rotate(90)')
                .text(smartRUtils.shortenConcept(yArrLabel) + ' (' + transformation + ')');

            svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(' + 0 + ',' + height + ')')
                .call(d3.svg.axis()
                    .scale(x)
                    .orient('top'));

            svg.append('g')
                .attr('class', 'y axis')
                .attr('transform', 'translate(' + 0 + ',' + 0 + ')')
                .call(d3.svg.axis()
                    .scale(y)
                    .orient('right'));

            function excludeSelection() {
                var remainingPatientIDs = d3.selectAll('.point:not(.selected)').data().map(function(d) {
                    return d.patientID;
                });
                updateStatistics(remainingPatientIDs, true);
            }

            function zoomSelection() {
                if (d3.selectAll('.point.selected').size() < 2) {
                    alert('Please select at least two elements before zooming!');
                    return;
                }
                var selectedPatientIDs = d3.selectAll('.point.selected').data().map(function(d) { return d.patientID; });
                updateStatistics(selectedPatientIDs, false, true);
            }

            var contextMenu = d3.tip()
                .attr('class', 'd3-tip sr-contextmenu')
                .offset([-10, 0])
                .html(function(d) { return d; });

            svg.call(contextMenu);

            function updateSelection() {
                var extent = brush.extent();
                var x0 = x.invert(extent[0][0]);
                var x1 = x.invert(extent[1][0]);
                var y0 = y.invert(extent[0][1]);
                var y1 = y.invert(extent[1][1]);
                svg.selectAll('.point')
                    .classed('selected', false)
                    .style('fill', function(d) { return getColor(d.annotation); })
                    .style('stroke', 'white')
                    .filter(function(d) {
                        return x0 <= d.x && d.x <= x1 && y1 <= d.y && d.y <= y0;
                    })
                    .classed('selected', true)
                    .style('fill', 'white')
                    .style('stroke', function(d) { return getColor(d.annotation); });
            }

            var brush = d3.svg.brush()
                .x(d3.scale.identity().domain([0, width]))
                .y(d3.scale.identity().domain([0, height]))
                .on('brushend', function() {
                    contextMenu.hide();
                    updateSelection();
                    var selectedPatientIDs = d3.selectAll('.point.selected').data().map(function(d) { return d.patientID; });
                    updateStatistics(selectedPatientIDs);
                });

            svg.append('g')
                .attr('class', 'brush')
                .on('mousedown', function() {
                    return d3.event.button === 2 ? d3.event.stopImmediatePropagation() : null;
                })
                .call(brush);

            function getColor(annotation) {
                return annotation && annotation !== 'Default' ? colors[annotations.indexOf(annotation)] : 'black';
            }

            function updateScatterplot() {
                var point = svg.selectAll('.point')
                    .data(points, function(d) { return d.patientID; });

                point.enter()
                    .append('circle')
                    .attr('class', 'point')
                    .attr('cx', function(d) { return x(d.x); })
                    .attr('cy', function(d) { return y(d.y); })
                    .attr('r', 5)
                    .style('fill', function(d) { return getColor(d.annotation); })
                    .on('mouseover', function(d) {
                        d3.select(this).style('fill', '#FF0000');
                        tip.show(smartRUtils.shortenConcept(xArrLabel) + ': ' + d.x + '<br/>' +
                            smartRUtils.shortenConcept(yArrLabel) + ': ' + d.y + '<br/>' +
                            'Patient ID: ' + d.patientID + '<br/>' +
                            (d.annotation ? 'Tag: ' + d.annotation : ''));
                    })
                    .on('mouseout', function() {
                        var p = d3.select(this);
                        p.style('fill', function(d) {
                            return p.classed('selected') ? '#FFFFFF' : getColor(d.annotation);
                        });
                        tip.hide();
                    });

                point.exit()
                    .classed('selected', false)
                    .transition()
                    .duration(animationDuration)
                    .attr('r', 0)
                    .remove();
            }

            function updateHistogram() {
                var bottomHistData = d3.layout.histogram()
                    .bins(bins)(points.map(function(d) { return d.x; }));
                var leftHistData = d3.layout.histogram()
                    .bins(bins)(points.map(function(d) { return d.y; }));

                var bottomHistHeightScale = d3.scale.linear()
                    .domain([0, Math.max.apply(null, bottomHistData.map(function(d) { return d.y; }))])
                    .range([1, bottomHistHeight]);
                var leftHistHeightScale = d3.scale.linear()
                    .domain([0, Math.max.apply(null, leftHistData.map(function(d) { return d.y; }))])
                    .range([2, leftHistHeight]);

                var bottomHistGroup = svg.selectAll('.bar.bottom')
                    .data(Array(bins).fill().map(function(_, i) { return i; }));
                var bottomHistGroupEnter = bottomHistGroup.enter()
                    .append('g')
                    .attr('class', 'bar bottom');
                var bottomHistGroupExit = bottomHistGroup.exit();

                bottomHistGroupEnter.append('rect')
                    .attr('y', height + 1);
                bottomHistGroup.selectAll('rect')
                    .transition()
                    .delay(function(d) { return d * 25; })
                    .duration(animationDuration)
                    .attr('x', function(d) { return x(bottomHistData[d].x); })
                    .attr('width', function() { return (x(maxX) - x(minX)) / bins; })
                    .attr('height', function(d) { return bottomHistHeightScale(bottomHistData[d].y) - 1; });
                bottomHistGroupExit.selectAll('rect')
                    .transition()
                    .duration(animationDuration)
                    .attr('height', 0);

                bottomHistGroupEnter.append('text')
                    .attr('dy', '.35em')
                    .attr('text-anchor', 'middle');
                bottomHistGroup.selectAll('text')
                    .text(function(d) { return bottomHistData[d].y || ''; })
                    .transition()
                    .delay(function(d) { return d * 25; })
                    .duration(animationDuration)
                    .attr('x', function(d) { return x(bottomHistData[d].x) + (x(maxX) - x(minX)) / bins / 2; })
                    .attr('y', function(d) { return height + bottomHistHeightScale(bottomHistData[d].y) - 10; });
                bottomHistGroupExit.selectAll('text')
                    .text('');

                var leftHistGroup = svg.selectAll('.bar.left')
                    .data(Array(bins).fill().map(function(_, i) { return i; }));
                var leftHistGroupEnter = leftHistGroup.enter()
                    .append('g')
                    .attr('class', 'bar left');
                var leftHistGroupExit = leftHistGroup.exit();

                leftHistGroupEnter.append('rect');
                leftHistGroup.selectAll('rect')
                    .transition()
                    .delay(function(d) { return d * 25; })
                    .duration(animationDuration)
                    .attr('x', function(d) { return - leftHistHeightScale(leftHistData[d].y) + 1; })
                    .attr('y', function(d) { return y(leftHistData[d].x) - (y(minY) - y(maxY))/ bins; })
                    .attr('width', function(d) { return leftHistHeightScale(leftHistData[d].y) - 2; })
                    .attr('height', function() { return (y(minY) - y(maxY))/ bins; });
                leftHistGroupExit.selectAll('rect')
                    .transition()
                    .duration(animationDuration)
                    .attr('height', 0);

                leftHistGroupEnter.append('text')
                    .attr('dy', '.35em')
                    .attr('text-anchor', 'middle');
                leftHistGroup.selectAll('text')
                    .text(function(d) { return leftHistData[d].y || ''; })
                    .transition()
                    .delay(function(d) { return d * 25; })
                    .duration(animationDuration)
                    .attr('x', function(d) { return - leftHistHeightScale(leftHistData[d].y) + 10; })
                    .attr('y', function(d) { return y(leftHistData[d].x) - (y(minY) - y(maxY))/ bins / 2; });
                leftHistGroupExit.selectAll('text')
                    .text('');
            }

            function updateLegends() {
                var _LEGEND_LINE_SPACING = 15,
                    _LEGEND_RECT_SIZE = 10;
                var text = [
                    {name: 'Correlation Coefficient: ' + correlation},
                    {name: 'p-value: ' + pvalue},
                    {name: 'Method: ' + method},
                    {name: 'Selected: ' + d3.selectAll('.point.selected').size() || d3.selectAll('.point').size()},
                    {name: 'Displayed: ' + d3.selectAll('.point').size()}
                ];

                annotations.forEach(function(annotation) {
                    text.push({color: getColor(annotation), name: annotation});
                });

                var legend = svg.selectAll('.legend')
                    .data(text, function(d) { return d.name; });

                var legendEnter = legend.enter()
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', function(d, i) {
                        return 'translate(' + (width + 40) + ',' + (i * (_LEGEND_RECT_SIZE + _LEGEND_LINE_SPACING)) + ')';
                    });

                legendEnter.append('text');
                legendEnter.append('rect');

                legend.select('text')
                    .attr('x', function(d) { return d.color ? 20 : 0; })
                    .attr('y', 9)
                    .text(function(d) { return d.name; });

                legend.select('rect')
                    .attr('width', _LEGEND_RECT_SIZE)
                    .attr('height', _LEGEND_RECT_SIZE)
                    .style('fill', function(d) { return d.color; })
                    .style('visibility', function(d) { return d.color ? 'visible' : 'hidden'; });

                legend.exit()
                    .remove();
            }

            function updateRegressionLine() {
                var regressionLine = svg.selectAll('.regressionLine')
                    .data(regLineSlope === 'NA' ? [] : [0], function(d) { return d; });
                regressionLine.enter()
                    .append('line')
                    .attr('class', 'regressionLine')
                    .on('mouseover', function () {
                        d3.select(this).attr('stroke', 'red');
                        tip.show('slope: ' + regLineSlope + '<br/>intercept: ' + regLineYIntercept);
                    })
                    .on('mouseout', function () {
                        d3.select(this).attr('stroke', 'orange');
                        tip.hide();
                    });

                var x1 = x(minX),
                    y1 = y(regLineYIntercept + regLineSlope * minX),
                    x2 = x(maxX),
                    y2 = y(regLineYIntercept + regLineSlope * maxX);

                x1 = x1 < 0 ? 0 : x1;
                x1 = x1 > width ? width : x1;

                x2 = x2 < 0 ? 0 : x2;
                x2 = x2 > width ? width : x2;

                y1 = y1 < 0 ? 0 : y1;
                y1 = y1 > height ? height : y1;

                y2 = y2 < 0 ? 0 : y2;
                y2 = y2 > height ? height : y2;

                regressionLine.transition()
                    .duration(animationDuration)
                    .attr('x1', x1)
                    .attr('y1', y1)
                    .attr('x2', x2)
                    .attr('y2', y2);

                regressionLine.exit()
                    .remove();
            }

            function reset() {
                updateStatistics([], true, true);
            }

            updateScatterplot();
            updateHistogram();
            updateRegressionLine();
            updateLegends();
        }

    }]);

angular.module('smartRApp')
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state('correlation', {
                parent: 'site',
                url: '/correlation',
                views: {
                    '@': {
                        templateUrl: 'src/containers/correlation/correlation.html'
                    },
                    'content@correlation': {
                        templateUrl: 'src/containers/correlation/correlation.content.html'
                    },
                    'sidebar@correlation': {
                        templateUrl: 'app/components/sidebar/sidebar.html',
                        controller: 'SidebarCtrl',
                        controllerAs: 'vm'
                    }
                }
            });
    }]);

angular.module('smartRApp').directive('heatmapPlot', [
    'smartRUtils',
    '$rootScope',
    'EndpointService',
    function(smartRUtils, $rootScope, EndpointService) {

        return {
            restrict: 'E',
            scope: {
                data: '=',
                width: '@',
                height: '@',
                params: '='
            },
            templateUrl:   'src/containers/templates/heatmap.html',
            link: function(scope, element) {

                var viz = element.children()[1];
                /**
                 * Watch data model (which is only changed by ajax calls when we want to (re)draw everything)
                 */
                scope.$watch('data', function(newValue) {
                    scope.showControls = false;
                    angular.element(viz).empty();
                    if (angular.isArray(newValue.fields)) {
                        scope.showControls = true;
                        createHeatmap(scope, viz);
                    }
                }, true);
            }
        };

        function createHeatmap(scope, root) {
            console.log(scope.data);
            var ANIMATION_DURATION = 1500;

            var fields = scope.data.fields;
            var extraFields = scope.data.extraFields;
            var features = scope.data.features.constructor === Array ? scope.data.features : [];

            var patientIDs = scope.data.patientIDs.map(function(d) { return parseInt(d); });
            var colNames = scope.data.colNames; // unique
            var rowNames = scope.data.rowNames; // unique

            var longestColName = colNames.reduce(function(prev, curr) {
                return curr.length > prev.length ? curr : prev;
            }, '');
            var longestColNameLength = smartRUtils.getTextWidth(longestColName);

            var longestRowName = rowNames.reduce(function(prev, curr) {
                return curr.length > prev.length ? curr : prev;
            }, '');
            var longestRowNameLength = smartRUtils.getTextWidth(longestRowName);

            var originalColNames = colNames.slice();
            var originalRowNames = rowNames.slice();

            var ranking = scope.data.ranking[0].toUpperCase();
            var statistics = scope.data.allStatValues;

            var maxRows = scope.data.maxRows[0];

            var geneCardsAllowed = JSON.parse(scope.params.geneCardsAllowed);

            var gridFieldWidth = 20;
            var gridFieldHeight = 10;
            var dendrogramHeight = 300;
            var histogramHeight = 200;
            var legendWidth = 200;
            var legendHeight = 40;

            var margin = {
                top: gridFieldHeight * 2 + features.length * gridFieldHeight + dendrogramHeight + 100,
                right: gridFieldWidth + 300 + dendrogramHeight,
                bottom: 10,
                left: histogramHeight
            };

            var width = gridFieldWidth * colNames.length;
            var height = gridFieldHeight * rowNames.length;

            // FIXME: This is here because the sizing of the whole heatmap is kind of messed up
            // At one point in the future we need to fix this
            smartRUtils.prepareWindowSize(width * 2 + margin.left + margin.right, height * 2 + margin.top + margin.right);

            var selectedColNames = [];

            var scale = null;
            var histogramScale = null;

            var animationCheck = smartRUtils.getElementWithoutEventListeners('sr-heatmap-animate-check');
            animationCheck.checked = fields.length < 10000;

            var zoomRange = smartRUtils.getElementWithoutEventListeners('sr-heatmap-zoom-range');
            zoomRange.addEventListener('mouseup', function() { zoom(parseInt(zoomRange.value)); });
            zoomRange.value = 100;

            var cutoffBtn = smartRUtils.getElementWithoutEventListeners('sr-heatmap-cutoff-btn');
            cutoffBtn.addEventListener('click', cutoff);

            var cutoffRange = smartRUtils.getElementWithoutEventListeners('sr-heatmap-cutoff-range');
            cutoffRange.addEventListener('mouseup', function() { animateCutoff(parseInt(cutoffRange.value)); });
            cutoffRange.setAttribute('max', maxRows);
            cutoffRange.value = 0;

            var clusterSelect = smartRUtils.getElementWithoutEventListeners('sr-heatmap-cluster-select');
            clusterSelect.addEventListener('change', function() { cluster(clusterSelect.value); });
            clusterSelect.disabled = maxRows < 2;
            clusterSelect.selectedIndex = 0;

            var clusterRowCheck = smartRUtils.getElementWithoutEventListeners('sr-heatmap-row-check');
            clusterRowCheck.disabled = maxRows < 2;
            clusterRowCheck.checked = true;

            var clusterColCheck = smartRUtils.getElementWithoutEventListeners('sr-heatmap-col-check');
            clusterColCheck.disabled = maxRows < 2;
            clusterColCheck.checked = true;

            var colorSelect = smartRUtils.getElementWithoutEventListeners('sr-heatmap-color-select');
            colorSelect.addEventListener('change', function() { updateColors(colorSelect.value); });
            colorSelect.selectedIndex = 0;

            var rankingSelect = smartRUtils.getElementWithoutEventListeners('sr-heatmap-ranking-select');
            rankingSelect.addEventListener('change', function() { setRanking(rankingSelect.value); });
            while (rankingSelect.firstChild) {
                rankingSelect.removeChild(rankingSelect.firstChild);
            }
            for (var stat in statistics[0]) { // collect existing statistics headers
                if (statistics[0].hasOwnProperty(stat) && stat !== 'ROWNAME') {
                    var option = document.createElement('option');
                    if (ranking === stat) {
                        option.selected = true;
                    }
                    option.setAttribute('value', stat);
                    option.innerHTML = stat.toLowerCase();
                    rankingSelect.appendChild(option);
                }
            }

            function setScales() {
                scale = d3.scale.linear()
                    .domain(d3.extent(statistics.map(function(d) { return d[ranking]; })))
                    .range((ranking === 'PVAL' || ranking === 'ADJPVAL') ? [histogramHeight, 0] : [0, histogramHeight]);

                histogramScale = function(value) {
                    return (ranking === 'TTEST' || ranking === 'LOGFOLD') ? scale(Math.abs(value)) : scale(value);
                };
            }
            setScales();

            function getInternalSortValue(value) {
                switch (ranking) {
                    case 'PVAL':
                    case 'ADJPVAL':
                        return 1 - value;
                    default:
                        return value;
                }
            }

            var heatmap = d3.select(root).append('svg')
                .attr('width', (width + margin.left + margin.right) * 4)
                .attr('height', (height + margin.top + margin.bottom) * 4)
                .attr('class', 'visualization')
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            function adjustDimensions() {
                // gridFieldWidth/gridFieldHeight are adjusted outside as the zoom changes
                $(heatmap[0]).closest('svg')
                    .attr('width', margin.left + margin.right + (gridFieldWidth * colNames.length))
                    .attr('height', margin.top + margin.bottom + (gridFieldHeight * rowNames.length));
            }

            adjustDimensions();

            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function(d) { return d; });

            heatmap.call(tip);

            var featureItems = heatmap.append('g');
            var squareItems = heatmap.append('g');
            var colSortItems = heatmap.append('g');
            var selectItems = heatmap.append('g');
            var colNameItems = heatmap.append('g');
            var rowSortItems = heatmap.append('g');
            var significanceSortItems = heatmap.append('g');
            var labelItems = heatmap.append('g');
            var barItems = heatmap.append('g');
            var legendItems = heatmap.append('g');

            // this code is needed for the legend generation
            var zScores = fields.map(function(d) { return d.ZSCORE; });
            var maxZScore = zScores.reduce(function(prev, curr) { return curr > prev ? curr : prev; });
            var minZScore = zScores.reduce(function(prev, curr) { return curr < prev ? curr : prev; });
            var steps = [];
            for (var i = minZScore; i < maxZScore; i+= (maxZScore - minZScore) / 50) {
                steps.push(i);
            }

            function updateHeatmap() {
                updateHeatmapTable();
                var square = squareItems.selectAll('.square')
                    .data(fields);

                square.enter()
                    .append('rect')
                    .attr('class', function(d) {
                        return 'square colname-' + smartRUtils.makeSafeForCSS(d.COLNAME) +
                            ' rowname-' + smartRUtils.makeSafeForCSS(d.ROWNAME);
                    })
                    .attr('x', function(d) { return colNames.indexOf(d.COLNAME) * gridFieldWidth; })
                    .attr('y', function(d) { return rowNames.indexOf(d.ROWNAME) * gridFieldHeight; })
                    .attr('width', gridFieldWidth)
                    .attr('height', gridFieldHeight)
                    .on('mouseover', function(d) {
                        d3.select('.colname.colname-' + smartRUtils.makeSafeForCSS(d.COLNAME))
                            .classed('highlight', true);
                        d3.select('.rowname.rowname-' + smartRUtils.makeSafeForCSS(d.ROWNAME))
                            .classed('highlight', true);

                        var html = 'Log2: ' + d.VALUE + '<br/>' +
                            'z-Score: ' + d.ZSCORE + '<br/>' +
                            'Column: ' + d.COLNAME + '<br/>' +
                            'Row: ' + d.ROWNAME + '<br/>' +
                            'PatientId: ' + d.PATIENTID + '</br>' +
                            'Subset: ' + d.SUBSET + '<br/>';

                        tip.show(html);
                    })
                    .on('mouseout', function() {
                        d3.selectAll('.colname').classed('highlight', false);
                        d3.selectAll('.rowname').classed('highlight', false);
                        tip.hide();
                    });

                square.transition()
                    .duration(animationCheck.checked ? ANIMATION_DURATION : 0)
                    .attr('x', function(d) { return colNames.indexOf(d.COLNAME) * gridFieldWidth; })
                    .attr('y', function(d) { return rowNames.indexOf(d.ROWNAME) * gridFieldHeight; })
                    .attr('width', gridFieldWidth)
                    .attr('height', gridFieldHeight);

                var colSortText = colSortItems.selectAll('.colSortText')
                    .data(colNames);

                colSortText.enter()
                    .append('text')
                    .attr('class', 'colSortText')
                    .attr('dy', '0.35em')
                    .style('text-anchor', 'middle')
                    .text('↑↓');

                colSortText.transition()
                    .duration(animationCheck.checked ? ANIMATION_DURATION : 0)
                    .attr('x', function(d, i) { return i * gridFieldWidth + 0.5 * gridFieldWidth; })
                    .attr('y', -2 - gridFieldHeight + 0.5 * gridFieldHeight)
                    .style('font-size', gridFieldHeight + 'px');

                function getValueForSquareSorting(colName, rowName) {
                    var square = d3.select('.square' + '.colname-' + smartRUtils.makeSafeForCSS(colName) +
                        '.rowname-' + smartRUtils.makeSafeForCSS(rowName));
                    return square[0][0] ? square.property('__data__').ZSCORE : Number.NEGATIVE_INFINITY;
                }

                function isSorted(arr) {
                    return arr.every(function(d, i) {
                        return i === arr.length - 1 || arr[i][1] >= arr[i + 1][1];
                    });
                }

                var colSortBox = colSortItems.selectAll('.colSortBox')
                    .data(colNames);

                colSortBox.enter()
                    .append('rect')
                    .attr('class', function(d, i) { return 'box colSortBox idx-' + i; })
                    .on('click', function(colName) {
                        var rowValues = rowNames.map(function(rowName, idx) {
                            return [idx, getValueForSquareSorting(colName, rowName)];
                        });
                        if (isSorted(rowValues)) {
                            rowValues.sort(function(a, b) { return a[1] - b[1]; });
                        } else {
                            rowValues.sort(function(a, b) { return b[1] - a[1]; });
                        }
                        var sortValues = rowValues.map(function(rowValue) { return rowValue[0]; });
                        updateRowOrder(sortValues);

                        d3.selectAll('.colSortBox').classed('sortedBy', false);
                        d3.selectAll('.significanceSortBox').classed('sortedBy', false);
                        d3.select(this).classed('sortedBy', true);

                        var sortedByBoxes = d3.selectAll('.sortedBy').filter('.rowSortBox');
                        if (!sortedByBoxes.empty()) {
                            var className = sortedByBoxes.attr('class');
                            var sortedByIdx = parseInt(className.match(/idx-(\d+)/)[1]);
                            d3.selectAll('.rowSortBox').classed('sortedBy', false);
                            d3.selectAll('.rowSortBox').filter('.idx-' + sortValues.indexOf(sortedByIdx)).classed('sortedBy', true);
                        }
                    });

                colSortBox.transition()
                    .duration(animationCheck.checked ? ANIMATION_DURATION : 0)
                    .attr('x', function(d, i) { return i * gridFieldWidth; })
                    .attr('y', -2 - gridFieldHeight)
                    .attr('width', gridFieldWidth)
                    .attr('height', gridFieldHeight);

                var rowSortText = rowSortItems.selectAll('.rowSortText')
                    .data(rowNames);

                rowSortText.enter()
                    .append('text')
                    .attr('class', 'rowSortText')
                    .attr('dy', '0.35em')
                    .style('text-anchor', 'middle')
                    .text('↑↓');

                rowSortText.transition()
                    .duration(animationCheck.checked ? ANIMATION_DURATION : 0)
                    .style('font-size', gridFieldHeight + 'px')
                    .attr('transform', function(d, i) {
                        return 'translate(' + (width + 2 + 0.5 * gridFieldWidth) + ',0)' + 'translate(0,' +
                            (i * gridFieldHeight + 0.5 * gridFieldHeight) + ')rotate(-90)';
                    });

                var rowSortBox = rowSortItems.selectAll('.rowSortBox')
                    .data(rowNames);

                rowSortBox.enter()
                    .append('rect')
                    .attr('class', function(d, i) { return 'box rowSortBox idx-' + i; })
                    .on('click', function(rowName) {
                        var colValues = colNames.map(function(colName, idx) {
                            return [idx, getValueForSquareSorting(colName, rowName)];
                        });
                        if (isSorted(colValues)) {
                            colValues.sort(function(a, b) { return a[1] - b[1]; });
                        } else {
                            colValues.sort(function(a, b) { return b[1] - a[1]; });
                        }
                        var sortValues = colValues.map(function(colValue) { return colValue[0]; });
                        updateColOrder(sortValues);

                        d3.selectAll('.rowSortBox').classed('sortedBy', false);
                        d3.selectAll('.featureSortBox').classed('sortedBy', false);
                        d3.select(this).classed('sortedBy', true);
                        var sortedByBoxes = d3.selectAll('.sortedBy').filter('.colSortBox');
                        if (!sortedByBoxes.empty()) {
                            var className = sortedByBoxes.attr('class');
                            var sortedByIdx = parseInt(className.match(/idx-(\d+)/)[1]);
                            d3.selectAll('.colSortBox').classed('sortedBy', false);
                            d3.selectAll('.colSortBox').filter('.idx-' + sortValues.indexOf(sortedByIdx)).classed('sortedBy', true);
                        }
                    });

                rowSortBox.transition()
                    .duration(animationCheck.checked ? ANIMATION_DURATION : 0)
                    .attr('x', width + 2)
                    .attr('y', function(d, i) { return i * gridFieldHeight; })
                    .attr('width', gridFieldWidth)
                    .attr('height', gridFieldHeight);

                var significanceSortText = significanceSortItems.selectAll('.significanceSortText')
                    .data(['something']);

                significanceSortText.enter()
                    .append('text')
                    .attr('class', 'significanceSortText')
                    .attr('dy', '0.35em')
                    .style('text-anchor', 'middle')
                    .text('↑↓');

                significanceSortText.transition()
                    .duration(animationCheck.checked ? ANIMATION_DURATION : 0)
                    .style('font-size', gridFieldHeight + 'px')
                    .attr('x', -gridFieldWidth - 10 + 0.5 * gridFieldWidth)
                    .attr('y', -2 - gridFieldHeight + 0.5 * gridFieldHeight);

                var significanceSortBox = significanceSortItems.selectAll('.significanceSortBox')
                    .data(['something']);

                significanceSortBox.enter()
                    .append('rect')
                    .attr('class', 'box significanceSortBox')
                    .on('click', function() {
                        var rowValues = statistics.map(function(d) { return d[ranking]; })
                            .map(function(significanceValue, idx) {
                                return [idx, getInternalSortValue(significanceValue)];
                            });

                        if (isSorted(rowValues)) {
                            rowValues.sort(function(a, b) { return a[1] - b[1]; });
                        } else {
                            rowValues.sort(function(a, b) { return b[1] - a[1]; });
                        }
                        var sortValues = rowValues.map(function(rowValue) { return rowValue[0]; });
                        updateRowOrder(sortValues);

                        d3.selectAll('.colSortBox').classed('sortedBy', false);
                        d3.select(this).classed('sortedBy', true);

                        var sortedByBoxes = d3.selectAll('.sortedBy').filter('.rowSortBox');
                        if (!sortedByBoxes.empty()) {
                            var className = sortedByBoxes.attr('class');
                            var sortedByIdx = parseInt(className.match(/idx-(\d+)/)[1]);
                            d3.selectAll('.rowSortBox').classed('sortedBy', false);
                            d3.selectAll('.rowSortBox').filter('.idx-' + sortValues.indexOf(sortedByIdx)).classed('sortedBy', true);
                        }
                    });

                significanceSortBox.transition()
                    .duration(animationCheck.checked ? ANIMATION_DURATION : 0)
                    .attr('x', -gridFieldWidth - 10)
                    .attr('y', -2 - gridFieldHeight)
                    .attr('width', gridFieldWidth)
                    .attr('height', gridFieldHeight);

                var selectText = selectItems.selectAll('.selectText')
                    .data(colNames, function(d) {
                        return d;
                    });

                selectText.enter()
                    .append('text')
                    .attr('class', function(d) { return 'selectText colname-' + smartRUtils.makeSafeForCSS(d); })
                    .attr('dy', '0.35em')
                    .style('text-anchor', 'middle')
                    .text('□');

                selectText.transition()
                    .duration(animationCheck.checked ? ANIMATION_DURATION : 0)
                    .style('font-size', gridFieldHeight + 'px')
                    .attr('x', function(d, i) { return i * gridFieldWidth + 0.5 * gridFieldWidth; })
                    .attr('y', -2 - gridFieldHeight * 2 + 0.5 * gridFieldHeight);

                var selectBox = selectItems.selectAll('.selectBox')
                    .data(colNames);

                selectBox.enter()
                    .append('rect')
                    .attr('class', 'box selectBox')
                    .on('click', function(colName) { selectCol(colName); });

                selectBox.transition()
                    .duration(animationCheck.checked ? ANIMATION_DURATION : 0)
                    .attr('x', function(d, i) { return i * gridFieldWidth; })
                    .attr('y', -2 - gridFieldHeight * 2)
                    .attr('width', gridFieldWidth)
                    .attr('height', gridFieldHeight);

                var colName = colNameItems.selectAll('.colname')
                    .data(colNames.map(function(colName, i) {
                        return { colName: colName, patientID: patientIDs[i] };
                    }), function(d) { return d.colName; });

                colName.enter()
                    .append('text')
                    .attr('class', function(d) {
                        return 'colname colname-' + smartRUtils.makeSafeForCSS(d.colName) +
                            ' patientID-' + smartRUtils.makeSafeForCSS(d.patientID);
                    })
                    .style('text-anchor', 'start')
                    .text(function(d) { return d.colName; });

                colName.transition()
                    .duration(animationCheck.checked ? ANIMATION_DURATION : 0)
                    .style('font-size', gridFieldHeight + 'px')
                    .attr('transform', function(d) {
                        return 'translate(' + (colNames.indexOf(d.colName) * gridFieldWidth) + ',0)' +
                            'translate(' + (gridFieldWidth / 2) + ',' + (-4 - gridFieldHeight * 2) + ')rotate(-45)';
                    });

                var rowName = labelItems.selectAll('.rowname')
                    .data(rowNames, function(d) { return d; });

                rowName.enter()
                    .append('text')
                    .attr('class', function(d) { return 'rowname rowname-' + smartRUtils.makeSafeForCSS(d); })
                    .attr('dy', '0.35em')
                    .style('text-anchor', 'start')
                    .text(function(d) { return d; })
                    .on('click', function(d) {
                        var genes = d.split('--');
                        genes.shift();
                        var urls = [];
                        if (geneCardsAllowed) {
                            genes.forEach(function(gene) {
                                urls.push('http://www.genecards.org/cgi-bin/carddisp.pl?gene=' + gene);
                            });
                        } else {
                            genes.forEach(function(gene) {
                                urls.push('https://www.ebi.ac.uk/ebisearch/search.ebi?db=allebi&query=' + gene);
                            });
                        }
                        urls.forEach(function(url) {
                            window.open(url);
                        });
                    });

                rowName.transition()
                    .duration(animationCheck.checked ? ANIMATION_DURATION : 0)
                    .style('font-size', gridFieldHeight + 'px')
                    .attr('x', width + gridFieldWidth + 7)
                    .attr('y', function(d) { return rowNames.indexOf(d) * gridFieldHeight + 0.5 * gridFieldHeight; });

                var bar = barItems.selectAll('.bar')
                    .data(statistics, function(d, i) { return i; });

                bar.enter()
                    .append('rect')
                    .on('mouseover', function(d) {
                        var html = '';
                        for (var key in d) {
                            if (d.hasOwnProperty(key) && key !== 'ROWNAME') {
                                html += (key === ranking ? '(ranked by) ' : '') + key + ': ' + d[key] + '<br/>';
                            }
                        }
                        tip.show(html);
                        d3.selectAll('.square.rowname-' + smartRUtils.makeSafeForCSS(d.ROWNAME))
                            .classed('squareHighlighted', true);
                        d3.select('.rowname.rowname-' + smartRUtils.makeSafeForCSS(d.ROWNAME))
                            .classed('highlight', true);
                    })
                    .on('mouseout', function() {
                        tip.hide();
                        d3.selectAll('.square').classed('squareHighlighted', false);
                        d3.selectAll('.rowname').classed('highlight', false);
                    });

                bar.attr('class', function(d) { return 'bar rowname-' + smartRUtils.makeSafeForCSS(d.ROWNAME); })
                    .transition()
                    .duration(animationCheck.checked ? ANIMATION_DURATION : 0)
                    .attr('width', function(d) { return histogramScale(d[ranking]); })
                    .attr('height', gridFieldHeight)
                    .attr('x', function(d) { return -histogramScale(d[ranking]); })
                    .attr('y', function(d) { return gridFieldHeight * rowNames.indexOf(d.ROWNAME); })
                    .style('fill', function(d) { return d[ranking] > 0 ? '#990000' : 'steelblue'; });

                var featurePosY = -gridFieldWidth * 2 - longestColNameLength + 20;

                var extraSquare = featureItems.selectAll('.extraSquare')
                    .data(extraFields);

                extraSquare.enter()
                    .append('rect')
                    .attr('class', function(d) {
                        return 'extraSquare patientID-' + smartRUtils.makeSafeForCSS(d.PATIENTID) +
                            ' rowname-' + smartRUtils.makeSafeForCSS(d.ROWNAME);
                    })
                    .on('mouseover', function(d) {
                        d3.select('.colname.patientID-' + smartRUtils.makeSafeForCSS(d.PATIENTID)).classed('highlight', true);
                        d3.select('.feature.feature-' + smartRUtils.makeSafeForCSS(d.ROWNAME)).classed('highlight', true);
                        var html = 'Value: ' + d.VALUE + '<br/>' +
                            (d.ZSCORE ? 'z-Score: ' + d.ZSCORE + '<br/>' : '') +
                            'Column: ' + d.COLNAME + '<br/>' +
                            'Row: ' + d.ROWNAME + '<br/>' +
                            'PatientId: ' + d.PATIENTID + '<br/>' +
                            'Type: ' + d.TYPE + '<br/>' +
                            'Subset: ' + d.SUBSET;

                        tip.show(html);
                    })
                    .on('mouseout', function() {
                        tip.hide();
                        d3.selectAll('.colname').classed('highlight', false);
                        d3.selectAll('.feature').classed('highlight', false);
                    });

                extraSquare.transition()
                    .duration(animationCheck.checked ? ANIMATION_DURATION : 0)
                    .attr('x', function(d) { return patientIDs.indexOf(d.PATIENTID) * gridFieldWidth; })
                    .attr('y', function(d) { return featurePosY - features.indexOf(d.ROWNAME) * gridFieldHeight; })
                    .attr('width', gridFieldWidth)
                    .attr('height', gridFieldHeight);

                var feature = featureItems.selectAll('.feature')
                    .data(features);

                feature.enter()
                    .append('text')
                    .attr('class', function(d) { return 'feature feature-' + smartRUtils.makeSafeForCSS(d); })
                    .attr('dy', '0.35em')
                    .style('text-anchor', 'start')
                    .text(function(d) {
                        return d === 'Cohort' ? d : smartRUtils.shortenConcept(d);
                    });

                feature.transition()
                    .duration(animationCheck.checked ? ANIMATION_DURATION : 0)
                    .style('font-size', gridFieldHeight + 'px')
                    .attr('x', width + gridFieldWidth + 7)
                    .attr('y', function(d) { return featurePosY - features.indexOf(d) * gridFieldHeight + gridFieldHeight / 2; });

                var featureSortText = featureItems.selectAll('.featureSortText')
                    .data(features);

                featureSortText.enter()
                    .append('text')
                    .attr('class', 'featureSortText')
                    .attr('dy', '0.35em')
                    .style('text-anchor', 'middle')
                    .text('↑↓');

                featureSortText.transition()
                    .duration(animationCheck.checked ? ANIMATION_DURATION : 0)
                    .style('font-size', gridFieldHeight + 'px')
                    .attr('transform', function(d) {
                        return 'translate(' + (width + 2 + 0.5 * gridFieldWidth) + ',0)' + 'translate(0,' +
                            (featurePosY - features.indexOf(d) * gridFieldHeight + gridFieldHeight / 2) + ')rotate(-90)';
                    });

                var featureSortBox = featureItems.selectAll('.featureSortBox')
                    .data(features);

                featureSortBox.enter()
                    .append('rect')
                    .attr('class', 'box featureSortBox')
                    .on('click', function(feature) {
                        var featureValues = patientIDs.map(function(patientID, idx) {
                            var css = 'extraSquare rowname-' + smartRUtils.makeSafeForCSS(feature) +
                                ' patientID-' + smartRUtils.makeSafeForCSS(patientID);
                            var elements = document.getElementsByClassName(css);
                            var value = (-Math.pow(2, 32)).toString(); // if square does not exist
                            if (elements.length > 0) {
                                var square = d3.select(elements[0]);
                                value = square.property('__data__').VALUE;
                            }
                            return [idx, value];
                        });
                        if (isSorted(featureValues)) {
                            featureValues.sort(function(a, b) {
                                var diff = a[1] - b[1];
                                return isNaN(diff) ? a[1].localeCompare(b[1]) : diff;
                            });
                        } else {
                            featureValues.sort(function(a, b) {
                                var diff = b[1] - a[1];
                                return isNaN(diff) ? b[1].localeCompare(a[1]) : diff;
                            });
                        }
                        var sortValues = featureValues.map(function(featureValue) {
                            return featureValue[0];
                        });
                        updateColOrder(sortValues);

                        d3.selectAll('.rowSortBox').classed('sortedBy', false);
                        d3.selectAll('.featureSortBox').classed('sortedBy', false);
                        d3.select(this).classed('sortedBy', true);
                        var sortedByBoxes = d3.selectAll('.sortedBy').filter('.colSortBox');
                        if (!sortedByBoxes.empty()) {
                            var className = sortedByBoxes.attr('class');
                            var sortedByIdx = parseInt(className.match(/idx-(\d+)/)[1]);
                            d3.selectAll('.colSortBox').classed('sortedBy', false);
                            d3.selectAll('.colSortBox').filter('.idx-' + sortValues.indexOf(sortedByIdx)).classed('sortedBy', true);
                        }
                    });


                featureSortBox.transition()
                    .duration(animationCheck.checked ? ANIMATION_DURATION : 0)
                    .attr('x', width + 2)
                    .attr('y', function(d) { return featurePosY - features.indexOf(d) * gridFieldHeight; })
                    .attr('width', gridFieldWidth)
                    .attr('height', gridFieldHeight);
            }

            function updateHeatmapTable() {
                d3.selectAll('.sr-heatmap-table').remove();

                var HEADER = ['ROWNAME'];
                for (var stat in statistics[0]) { // collect existing statistics headers
                    if (statistics[0].hasOwnProperty(stat) && stat !== 'ROWNAME') {
                        HEADER.push(stat);
                    }
                }
                var table = d3.select(root).append('table')
                    .attr('class', 'sr-heatmap-table');
                var thead = table.append('thead');
                var tbody = table.append('tbody');

                thead.append('tr')
                    .selectAll('th')
                    .data(HEADER)
                    .enter()
                    .append('th')
                    .text(function(d) {
                        return d;
                    });

                var probeIDs = [];
                var entities = [];
                rowNames.forEach(function(rowName) {
                    probeIDs.push(rowName.match(/.+(?=--)/)[0]);
                    entities.push(rowName.match(/.+?--(.*)/)[1]);
                });

                var rows = tbody.selectAll('tr')
                    .data(statistics)
                    .enter()
                    .append('tr');

                rows.selectAll('td')
                    .data(function(d, i) {
                        return HEADER.map(function(column) {
                            return {column: column, value: statistics[i][column]};
                        });
                    })
                    .enter()
                    .append('td')
                    .text(function(d) {
                        return d.value;
                    });
            }

            function zoom(zoomLevel) {
                zoomLevel /= 100;
                gridFieldWidth = 20 * zoomLevel;
                gridFieldHeight = 10 * zoomLevel;
                width = gridFieldWidth * colNames.length;
                height = gridFieldHeight * rowNames.length;
                heatmap
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', width + margin.top + margin.bottom);
                var temp = ANIMATION_DURATION;
                ANIMATION_DURATION = 0;
                updateHeatmap();
                reloadDendrograms();
                ANIMATION_DURATION = temp;
                adjustDimensions();
            }

            var cutoffLevel = 0;

            function animateCutoff(cutoff) {
                cutoff = Math.floor(cutoff);
                cutoffLevel = cutoff;
                d3.selectAll('.square')
                    .classed('cuttoffHighlight', false);
                d3.selectAll('.bar')
                    .classed('cuttoffHighlight', false);
                statistics.map(function(d) { return d[ranking]; })
                    .sort(function(a, b) { return a - b; })
                    .filter(function(d, i) { return i < cutoff; })
                    .forEach(function(d) {
                        d3.select('.bar.idx-' + smartRUtils.makeSafeForCSS(d[0])).classed('cuttoffHighlight', true);
                        d3.selectAll('.square.rowname-' + smartRUtils.makeSafeForCSS(rowNames[d[0]])).classed('cuttoffHighlight', true);
                    });
            }

            function cutoff() {
                //HeatmapService.startScriptExecution({
                //    taskType: 'run',
                //    arguments: params,
                //    onUltimateSuccess: HeatmapService.runAnalysisSuccess,
                //    onUltimateFailure: HeatmapService.runAnalysisFailed,
                //    phase: 'run',
                //    progressMessage: 'Calculating',
                //    successMessage: undefined
                //});
                // TODO: Use ajax service to be provided by ajaxServices.js to re-compute analysis
                // with new arguments (in this case filter for cut-off)
                scope.params.max_row = maxRows - cutoffLevel - 1;
                $('run-button input').click();
            }

            function reloadDendrograms() {
                if (colDendrogramVisible) {
                    removeColDendrogram();
                    createColDendrogram();
                }
                if (rowDendrogramVisible) {
                    removeRowDendrogram();
                    createRowDendrogram();
                }
            }

            function selectCol(colName) {
                var colSquares = d3.selectAll('.square.colname-' + smartRUtils.makeSafeForCSS(colName));
                if (colSquares.classed('selected')) {
                    var index = selectedColNames.indexOf(colName);
                    selectedColNames.splice(index, 1);
                    colSquares
                        .classed('selected', false);
                    d3.select('.selectText.colname-' + smartRUtils.makeSafeForCSS(colName))
                        .text('□');
                } else {
                    selectedColNames.push(colName);
                    colSquares.classed('selected', true);
                    d3.select('.selectText.colname-' + smartRUtils.makeSafeForCSS(colName))
                        .text('■');
                }
                if (selectedColNames.length !== 0) {
                    d3.selectAll('.square:not(.selected)')
                        .attr('opacity', 0.4);
                } else {
                    d3.selectAll('.square')
                        .attr('opacity', 1);
                }
            }

            var colorScale;
            function updateColors(schema) {
                var redGreenScale = d3.scale.quantile()
                    .domain([0, 1])
                    .range(function() {
                        var colorSet = [];
                        var NUM = 100;
                        var i = NUM;
                        while (i--) {
                            colorSet.push(d3.rgb((255 * i) / NUM, 0, 0));
                        }
                        i = NUM;
                        while (i--) {
                            colorSet.push(d3.rgb(0, (255 * (NUM - i)) / NUM, 0));
                        }
                        return colorSet.reverse();
                    }());

                var redBlueScale = d3.scale.quantile()
                    .domain([0, 1])
                    .range(function() {
                        var colorSet = [];
                        var NUM = 100;
                        var i = NUM;
                        while (i--) {
                            colorSet.push(d3.rgb((255 * i) / NUM, 0, 0));
                        }
                        i = NUM;
                        while (i--) {
                            colorSet.push(d3.rgb(0, 0, (255 * (NUM - i)) / NUM));
                        }
                        return colorSet.reverse();
                    }());

                var blueScale = d3.scale.linear()
                    .domain([0, 1])
                    .range(['#0000ff', '#e5e5ff']);

                var greenScale = d3.scale.linear()
                    .domain([0, 1])
                    .range(['#00ff00', '#e5ffe5']);

                var colorSchemas = {
                    redGreen: redGreenScale,
                    blueScale: blueScale,
                    redBlue: redBlueScale,
                    greenScale: greenScale
                };

                colorScale = colorSchemas[schema];

                d3.selectAll('.square')
                    .transition()
                    .duration(animationCheck.checked ? ANIMATION_DURATION : 0)
                    .attr('fill', function(d) {
                        return colorScale(1 / (1 + Math.pow(Math.E, -d.ZSCORE)));
                    });

                d3.selectAll('.legendColor')
                    .transition()
                    .duration(animationCheck.checked ? ANIMATION_DURATION : 0)
                    .attr('fill', function(d) {
                        return colorScale(1 / (1 + Math.pow(Math.E, -d)));
                    });

                var featureColorSetBinary = ['#FF8000', '#FFFF00'];
                var featureColorSetSequential = [
                    'rgb(247,252,253)', 'rgb(224,236,244)', 'rgb(191,211,230)',
                    'rgb(158,188,218)', 'rgb(140,150,198)', 'rgb(140,107,177)',
                    'rgb(136,65,157)', 'rgb(129,15,124)', 'rgb(77,0,75)'
                ];
                var featureColorCategorical = d3.scale.category10();

                features.forEach(function(feature) {
                    d3.selectAll('.extraSquare.rowname-' + smartRUtils.makeSafeForCSS(feature))
                        .style('fill', function(d) {
                            switch (d.TYPE) {
                                case 'binary':
                                    return featureColorSetBinary[d.VALUE];
                                case 'subset':
                                    return featureColorSetBinary[d.VALUE - 1];
                                case 'numeric':
                                    colorScale.range(featureColorSetSequential);
                                    return colorScale(1 / (1 + Math.pow(Math.E, -d.ZSCORE)));
                                default:
                                    return featureColorCategorical(d.VALUE);
                            }
                        });
                });

                updateLegend();
            }

            function updateLegend() {
                var legendElementWidth = legendWidth / steps.length;
                var legendElementHeight = legendHeight;

                var legendColor = legendItems.selectAll('.legendColor')
                    .data(steps, function(d) { return d; });

                legendColor.enter()
                    .append('rect')
                    .attr('class', 'legendColor')
                    .attr('x', function(d, i) { return 5 - margin.left + i * legendElementWidth; })
                    .attr('y', 8 - margin.top + 100)
                    .attr('width', Math.ceil(legendElementWidth))
                    .attr('height', legendElementHeight);

                d3.selectAll('.legendText').remove();

                legendItems.append('text')
                    .attr('class', 'legendText')
                    .attr('x', 5 - margin.left)
                    .attr('y', 8 - margin.top + 100)
                    .attr('text-anchor', 'start')
                    .text(Math.min.apply(null, steps).toFixed(1));

                legendItems.append('text')
                    .attr('class', 'legendText')
                    .attr('x', 5 - margin.left + legendWidth)
                    .attr('y', 8 - margin.top + 100)
                    .attr('text-anchor', 'end')
                    .text(Math.max.apply(null, steps).toFixed(1));
            }

            function unselectAll() {
                d3.selectAll('.selectText')
                    .text('□');
                d3.selectAll('.square')
                    .classed('selected', false)
                    .attr('opacity', 1);
                selectedColNames = [];
            }

            var colDendrogramVisible = false;
            var colDendrogram;

            function createColDendrogram() {
                var w = 200;
                var colDendrogramWidth = gridFieldWidth * colNames.length;
                var spacing = gridFieldWidth * 2 + longestColNameLength + features.length * gridFieldHeight - 20;

                var cluster = d3.layout.cluster()
                    .size([colDendrogramWidth, w])
                    .separation(function() { return 1; });

                var diagonal = d3.svg.diagonal()
                    .projection(function(d) { return [d.x, -spacing - w + d.y]; });

                var colDendrogramNodes = cluster.nodes(colDendrogram);
                var colDendrogramLinks = cluster.links(colDendrogramNodes);

                heatmap.selectAll('.colDendrogramLink')
                    .data(colDendrogramLinks)
                    .enter().append('path')
                    .attr('class', 'colDendrogram link')
                    .attr('d', diagonal);

                heatmap.selectAll('.colDendrogramNode')
                    .data(colDendrogramNodes)
                    .enter().append('circle')
                    .attr('class', 'colDendrogram node')
                    .attr('r', 4.5)
                    .attr('transform', function(d) {
                        return 'translate(' + d.x + ',' + (-spacing - w + d.y) + ')';
                    }).on('click', function(d) {
                    var previousSelection = selectedColNames.slice();
                    unselectAll();
                    var leafs = d.index.split(' ');
                    for (var i = 0; i < leafs.length; i++) {
                        var colName = colNames[leafs[i]];
                        selectCol(colName);
                    }
                    if (previousSelection.sort().toString() === selectedColNames.sort().toString()) {
                        unselectAll();
                    }
                })
                    .on('mouseover', function(d) {
                        tip.show('Height: ' + d.height);
                    })
                    .on('mouseout', function() {
                        tip.hide();
                    });
                colDendrogramVisible = true;
            }

            var rowDendrogramVisible = false;
            var rowDendrogram;

            function createRowDendrogram() {
                var h = 280;
                var rowDendrogramHeight = gridFieldHeight * rowNames.length;
                var spacing = gridFieldWidth + longestRowNameLength + 20;

                var cluster = d3.layout.cluster()
                    .size([rowDendrogramHeight, h])
                    .separation(function() {
                        return 1;
                    });

                var diagonal = d3.svg.diagonal()
                    .projection(function(d) {
                        return [width + spacing + h - d.y, d.x];
                    });

                var rowDendrogramNodes = cluster.nodes(rowDendrogram);
                var rowDendrogramLinks = cluster.links(rowDendrogramNodes);

                heatmap.selectAll('.rowDendrogramLink')
                    .data(rowDendrogramLinks)
                    .enter().append('path')
                    .attr('class', 'rowDendrogram link')
                    .attr('d', diagonal);

                heatmap.selectAll('.rowDendrogramNode')
                    .data(rowDendrogramNodes)
                    .enter().append('circle')
                    .attr('class', 'rowDendrogram node')
                    .attr('r', 4.5)
                    .attr('transform', function(d) {
                        return 'translate(' + (width + spacing + h - d.y) + ',' + d.x + ')';
                    }).on('click', function(d) {
                    var leafs = d.index.split(' ');
                    var genes = [];
                    leafs.forEach(function(leaf) {
                        var rowName = rowNames[leaf];
                        var split = rowName.split("--");
                        split.shift();
                        genes = genes.concat(split);
                    });
                    var baseURL = EndpointService.getMasterEndpoint().url;

                    var request = $.ajax({
                        url: baseURL + '/SmartR/biocompendium',
                        type: 'POST',
                        timeout: 5000,
                        data: {
                            genes: genes.join(' ')
                        }
                    });

                    request.then(
                        function(response) {
                            var sessionID = response.match(/tmp_\d+/)[0];
                            var url = 'http://biocompendium.embl.de/' +
                                'cgi-bin/biocompendium.cgi?section=pathway&pos=0&background=whole_genome&session=' +
                                sessionID + '&list=gene_list_1__1&list_size=15&org=human';
                            window.open(url);
                        },
                        function(response) { alert("Error:", response); }
                    );
                })
                    .on('mouseover', function(d) {
                        tip.show('Height: ' + d.height);
                    })
                    .on('mouseout', function() {
                        tip.hide();
                    });
                rowDendrogramVisible = true;
            }

            function removeColDendrogram() {
                heatmap.selectAll('.colDendrogram').remove();
                colDendrogramVisible = false;
            }

            function removeRowDendrogram() {
                heatmap.selectAll('.rowDendrogram').remove();
                rowDendrogramVisible = false;
            }

            function updateColOrder(sortValues, update) {
                update = typeof update === 'undefined' ? true : update;
                var newColnames = [];
                var newPatientIDs = [];
                sortValues.forEach(function(sortValue) {
                    newColnames.push(colNames[sortValue]);
                    newPatientIDs.push(patientIDs[sortValue]);
                });
                colNames = newColnames;
                patientIDs = newPatientIDs;
                unselectAll();
                removeColDendrogram();
                if (update) {
                    updateHeatmap();
                }
            }

            function updateRowOrder(sortValues, update) {
                update = typeof update === 'undefined' ? true : update;
                var sortedRowNames = [];
                var sortedStatistics = [];

                sortValues.forEach(function(sortValue) {
                    sortedRowNames.push(rowNames[sortValue]);
                    sortedStatistics.push(statistics[sortValue]);
                });
                rowNames = sortedRowNames;
                statistics = sortedStatistics;

                removeRowDendrogram();
                if (update) {
                    updateHeatmap();
                }
                animateCutoff();
            }

            function transformClusterOrderWRTInitialOrder(clusterOrder, initialOrder) {
                return clusterOrder.map(function(d) {
                    return initialOrder.indexOf(d);
                });
            }

            function getInitialRowOrder() {
                return rowNames.map(function(rowName) {
                    return originalRowNames.indexOf(rowName);
                });
            }

            function getInitialColOrder() {
                return colNames.map(function(colName) {
                    return originalColNames.indexOf(colName);
                });
            }

            var lastUsedClustering = null;

            function cluster(clustering) {
                if (!lastUsedClustering && typeof clustering === 'undefined') {
                    return; // Nothing should be done if clustering switches are turned on without clustering type set.
                }
                d3.selectAll('.box').classed('sortedBy', false);
                clustering = (typeof clustering === 'undefined') ? lastUsedClustering : clustering;
                var clusterData = scope.data.hclust[clustering];
                if (document.getElementById('sr-heatmap-row-check').checked && rowNames.length > 0) {
                    rowDendrogram = JSON.parse(clusterData[3]);
                    updateRowOrder(transformClusterOrderWRTInitialOrder(clusterData[1], getInitialRowOrder()), false);
                    createRowDendrogram(rowDendrogram);
                } else {
                    removeRowDendrogram();
                }
                if (document.getElementById('sr-heatmap-col-check').checked && colNames.length > 0) {
                    colDendrogram = JSON.parse(clusterData[2]);
                    updateColOrder(transformClusterOrderWRTInitialOrder(clusterData[0], getInitialColOrder()), false);
                    createColDendrogram(colDendrogram);
                } else {
                    removeColDendrogram();
                }
                lastUsedClustering = clustering;
                updateHeatmap();
            }

            function setRanking(method) {
                ranking = method;
                setScales();
                updateHeatmap();
            }

            function init() {
                var temp = ANIMATION_DURATION;
                ANIMATION_DURATION = 0;
                updateHeatmap();
                reloadDendrograms();
                updateColors('redGreen');
                updateColors('redGreen');
                ANIMATION_DURATION = temp;
            }

            init();

        }
    }]);

angular.module('smartRApp')
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state('heatmap', {
                parent: 'site',
                url: '/heatmap',
                views: {
                    '@': {
                        templateUrl: 'src/containers/heatmap/heatmap.html'
                    },
                    'content@heatmap': {
                        templateUrl: 'src/containers/heatmap/heatmap.content.html'
                    },
                    'sidebar@heatmap': {
                        templateUrl: 'app/components/sidebar/sidebar.html',
                        controller: 'SidebarCtrl',
                        controllerAs: 'vm'
                    }
                }
            });
    }]);

angular.module('smartRApp').directive('volcanoPlot', [
    'smartRUtils',
    function(smartRUtils) {

        return {
            restrict: 'E',
            scope: {
                data: '=',
                width: '@',
                height: '@'
            },
            link: function (scope, element) {

                /**
                 * Watch data model (which is only changed by ajax calls when we want to (re)draw everything)
                 */
                scope.$watch('data', function() {
                    $(element[0]).empty();
                    if (!$.isEmptyObject(scope.data)) {
                        smartRUtils.prepareWindowSize(scope.width, scope.height);
                        createVolcanoplot(scope, element[0]);
                    }
                });
            }
        };

        function createVolcanoplot(scope, root) {
            var uids = scope.data.uids;
            var pValues = scope.data.pvalValues;
            var negativeLog10PValues = scope.data.negativeLog10PvalValues;
            var logFCs = scope.data.logfoldValues;

            var points = negativeLog10PValues.map(function (d, i) {
                return {
                    uid: uids[i],
                    pValue: pValues[i],
                    negativeLog10PValues: negativeLog10PValues[i],
                    logFC: logFCs[i]
                };
            });

            var currentLogFC = 0.5;
            var currentNegLog10P = -Math.log10(0.05);

            var margin = {top: 100, right: 100, bottom: 100, left: 100};
            var width = scope.width - margin.left - margin.right;
            var height = scope.height - margin.top - margin.bottom;

            var volcanoplot = d3.select(root).append('svg')
                .style('float', 'left')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function(d) { return d; });

            volcanoplot.call(tip);

            var x = d3.scale.linear()
                .domain([-Math.max.apply(null, logFCs), Math.max.apply(null, logFCs)])
                .range([0, width]);

            var y = d3.scale.linear()
                .domain(d3.extent(negativeLog10PValues))
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient('bottom');

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient('left');

            volcanoplot.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(0,' + height + ')')
                .call(xAxis);

            volcanoplot.append('g')
                .attr('class', 'axis')
                .call(yAxis);

            volcanoplot.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0, 0)')
                .call(d3.svg.axis()
                    .scale(x)
                    .ticks(10)
                    .tickFormat('')
                    .innerTickSize(height)
                    .orient('bottom'));

            volcanoplot.append('g')
                .attr('class', 'y axis')
                .attr('transform', 'translate(' + width + ',' + 0 + ')')
                .call(d3.svg.axis()
                    .scale(y)
                    .ticks(10)
                    .tickFormat('')
                    .innerTickSize(width)
                    .orient('left'));

            volcanoplot.append('text')
                .attr('class', 'text axisText')
                .attr('x', width / 2)
                .attr('y', height + 40)
                .attr('text-anchor', 'middle')
                .text('log2 FC');

            volcanoplot.append('text')
                .attr('class', 'text axisText')
                .attr('text-anchor', 'middle')
                .attr('transform', 'translate(' + (-40) + ',' + (height / 2) + ')rotate(-90)')
                .text('- log10 p');

            function pDragged() {
                var yPos = d3.event.y;
                if (yPos < 0) {
                    yPos = 0;
                }
                if (yPos > height) {
                    yPos = height;
                }

                d3.selectAll('.pLine')
                    .attr('y1', yPos)
                    .attr('y2', yPos);

                d3.selectAll('.pHandle')
                    .attr('y', yPos - 6);

                d3.selectAll('.pText')
                    .attr('y', yPos)
                    .text('p = ' + (1 / Math.pow(10, y.invert(yPos))).toFixed(5));

                currentNegLog10P = y.invert(yPos);

                d3.selectAll('.point')
                    .style('fill', function (d) {
                        return getColor(d);
                    });

                drawVolcanotable(getTopRankedPoints().data());
            }

            var pDrag = d3.behavior.drag()
                .on('drag', pDragged)
                .on('dragend', d3.tip);

            volcanoplot.append('line')
                .attr('class', 'pLine')
                .attr('x1', 0)
                .attr('y1', y(currentNegLog10P))
                .attr('x2', width)
                .attr('y2', y(currentNegLog10P));

            volcanoplot.append('rect')
                .attr('class', 'pHandle')
                .attr('x', 0)
                .attr('y', y(currentNegLog10P) - 6)
                .attr('width', width)
                .attr('height', 12)
                .call(pDrag);

            volcanoplot.append('text')
                .attr('class', 'text pText')
                .attr('x', width + 5)
                .attr('y', y(currentNegLog10P))
                .attr('dy', '0.35em')
                .attr('text-anchor', 'start')
                .text('p = 0.0500')
                .style('fill', 'red');

            function lFCDragged() {
                var xPos = d3.event.x;

                if (xPos < 0) {
                    xPos = 0;
                }
                if (xPos > width) {
                    xPos = width;
                }

                var logFC = x.invert(xPos);

                d3.selectAll('.logFCLine.left')
                    .attr('x1', x(-Math.abs(logFC)))
                    .attr('x2', x(-Math.abs(logFC)));
                d3.selectAll('.logFCHandle.left')
                    .attr('x', x(-Math.abs(logFC)) - 6);
                d3.selectAll('.logFCText.left')
                    .attr('x', x(-Math.abs(logFC)))
                    .text('log2FC = ' + (-Math.abs(logFC)).toFixed(2));

                d3.selectAll('.logFCLine.right')
                    .attr('x1', x(Math.abs(logFC)))
                    .attr('x2', x(Math.abs(logFC)));
                d3.selectAll('.logFCHandle.right')
                    .attr('x', x(Math.abs(logFC)) - 6);
                d3.selectAll('.logFCText.right')
                    .attr('x', x(Math.abs(logFC)))
                    .text('log2FC = ' + Math.abs(logFC).toFixed(2));

                currentLogFC = Math.abs(logFC);

                d3.selectAll('.point')
                    .style('fill', function (d) {
                        return getColor(d);
                    });

                drawVolcanotable(getTopRankedPoints().data());
            }

            var lFCDrag = d3.behavior.drag()
                .on('drag', lFCDragged);

            volcanoplot.append('line')
                .attr('class', 'left logFCLine')
                .attr('x1', x(-currentLogFC))
                .attr('y1', height)
                .attr('x2', x(-currentLogFC))
                .attr('y2', 0);

            volcanoplot.append('rect')
                .attr('class', 'left logFCHandle')
                .attr('x', x(-currentLogFC) - 6)
                .attr('y', 0)
                .attr('width', 12)
                .attr('height', height)
                .call(lFCDrag);

            volcanoplot.append('text')
                .attr('class', 'text left logFCText')
                .attr('x', x(-currentLogFC))
                .attr('y', -15)
                .attr('dy', '0.35em')
                .attr('text-anchor', 'end')
                .text('log2FC = ' + (-currentLogFC))
                .style('fill', '#0000FF');

            volcanoplot.append('line')
                .attr('class', 'right logFCLine')
                .attr('x1', x(currentLogFC))
                .attr('y1', height)
                .attr('x2', x(currentLogFC))
                .attr('y2', 0);

            volcanoplot.append('rect')
                .attr('class', 'right logFCHandle')
                .attr('x', x(currentLogFC) - 6)
                .attr('y', 0)
                .attr('width', 12)
                .attr('height', height)
                .call(lFCDrag);

            volcanoplot.append('text')
                .attr('class', 'text right logFCText')
                .attr('x', x(currentLogFC))
                .attr('y', -15)
                .attr('dy', '0.35em')
                .attr('text-anchor', 'start')
                .text('log2FC = ' + currentLogFC)
                .style('fill', '#0000FF');

            function getTopRankedPoints() {
                return d3.selectAll('.point').filter(function (d) {
                    return d.negativeLog10PValues > currentNegLog10P && Math.abs(d.logFC) > currentLogFC;
                });
            }

            function getColor(point) {
                if (point.negativeLog10PValues < currentNegLog10P && Math.abs(point.logFC) < currentLogFC) {
                    return '#000000';
                }
                if (point.negativeLog10PValues >= currentNegLog10P && Math.abs(point.logFC) < currentLogFC) {
                    return '#FF0000';
                }
                if (point.negativeLog10PValues >= currentNegLog10P && Math.abs(point.logFC) >= currentLogFC) {
                    return '#00FF00';
                }
                return '#0000FF';
            }

            function resetVolcanotable() {
                d3.selectAll('.volcanoplot-table').remove();
            }

            function drawVolcanotable(points) {
                resetVolcanotable();
                if (!points.length) {
                    return;
                }
                var columns = ['uid', 'logFC', 'negativeLog10PValues', 'pValue'];
                var HEADER = ['ID', 'log2 FC', '- log10 p', 'p'];
                var table = d3.select(root).append('table')
                    .attr('class', 'volcanoplot-table');
                var thead = table.append('thead');
                var tbody = table.append('tbody');

                thead.append('tr')
                    .attr('class', 'mytr')
                    .selectAll('th')
                    .data(HEADER)
                    .enter()
                    .append('th')
                    .attr('class', 'myth')
                    .text(function (d) {
                        return d;
                    });

                var rows = tbody.selectAll('tr')
                    .data(points)
                    .enter()
                    .append('tr')
                    .attr('class', 'mytr');

                rows.selectAll('td')
                    .data(function (row) {
                        return columns.map(function (column) {
                            return {column: column, value: row[column]};
                        });
                    })
                    .enter()
                    .append('td')
                    .attr('class', 'text mytd')
                    .text(function (d) {
                        return d.value;
                    });
            }

            function updateVolcano() {
                var point = volcanoplot.selectAll('.point')
                    .data(points, function (d) {
                        return d.uid;
                    });

                point.enter()
                    .append('rect')
                    .attr('class', function(d) { return 'point uid-' + smartRUtils.makeSafeForCSS(d.uid); })
                    .attr('x', function (d) {
                        return x(d.logFC) - 2;
                    })
                    .attr('y', function (d) {
                        return y(d.negativeLog10PValues) - 2;
                    })
                    .attr('width', 4)
                    .attr('height', 4)
                    .style('fill', function (d) {
                        return getColor(d);
                    })
                    .on('mouseover', function (d) {
                        var html = 'ID: ' + d.uid + '<br/>' +
                            'p-value: ' + d.pValue + '<br/>' +
                            '-log10 p: ' + d.negativeLog10PValues + '<br/>' +
                            'log2FC: ' + d.logFC;
                        tip.show(html);
                    })
                    .on('mouseout', function () {
                        tip.hide();
                    });

                point.exit()
                    .attr('r', 0)
                    .remove();
            }

            updateVolcano();
            drawVolcanotable(getTopRankedPoints().data());
        }

    }]);


angular.module('smartRApp')
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state('volcanoplot', {
                parent: 'site',
                url: '/volcanoplot',
                views: {
                    '@': {
                        templateUrl: 'src/containers/volcanoplot/volcanoplot.html'
                    },
                    'content@volcanoplot': {
                        templateUrl: 'src/containers/volcanoplot/volcanoplot.content.html'
                    },
                    'sidebar@volcanoplot': {
                        templateUrl: 'app/components/sidebar/sidebar.html',
                        controller: 'SidebarCtrl',
                        controllerAs: 'vm'
                    }
                }
            });
    }]);

angular.module('smartRApp').directive('timelinePlot', ['smartRUtils', 'rServeService', function(smartRUtils, rServeService) {

    return {
        restrict: 'E',
        scope: {
            data: '=',
            width: '@',
            height: '@'
        },
        link: function (scope, element) {

            /**
             * Watch data model (which is only changed by ajax calls when we want to (re)draw everything)
             */
            scope.$watch('data', function () {
                $(element[0]).empty();
                if (scope.data) {
                    createTimeline(scope, element[0]);
                }
            });
        }
    };

    function createTimeline(scope, root) {

        d3.selection.prototype.moveToFront = function () {
            return this.each(function () {
                this.parentNode.appendChild(this);
            });
        };

        var data = results.data;
        var concepts = results.concepts;
        var patientIDs = results.patientIDs;
        var timepoints = results.timepoints;

        var timelineHeight = 200;
        var timelineWidth = 1000;
        var width = timelineWidth;
        var height = timelineHeight * concepts.length;
        var globalXAxisDist = 100;
        var localXAxisDist = 0;
        var margin = {top: 50, right: 300 + 30, bottom: globalXAxisDist + 100, left: 240};

        var colors = d3.scale.category10()
            .domain(patientIDs);

        var x = d3.scale.ordinal()
            .domain(timepoints)
            .rangePoints([0, timelineWidth]);

        var backgroundCheckChecked = false;

        function swapBackgroundColor(checked) {
            if (!checked) {
                d3.selectAll('.timeBox')
                    .transition()
                    .duration(1500)
                    .style('stroke', 'black')
                    .style('fill', 'white');
                d3.selectAll('.hoverline')
                    .transition()
                    .duration(1500)
                    .style('stroke', 'black');
                backgroundCheckChecked = true;
            } else {
                d3.selectAll('.timeBox')
                    .transition()
                    .duration(1500)
                    .style('stroke', 'white')
                    .style('fill', 'black');
                d3.selectAll('.hoverline')
                    .transition()
                    .duration(1500)
                    .style('stroke', 'white');
                backgroundCheckChecked = false;
            }

        }

        function updateLineDataPropertyByTimepoints() {
            d3.selectAll('.line').each(function (d) {
                var line = d3.select(this);
                var skiped = 0;
                for (var i = 0; i < x.domain().length; i++) {
                    var timepoint = x.domain()[i];
                    var index = ownIndexOf(d, getEqualityCheck(undefined, timepoint, undefined, undefined));
                    if (index === -1) {
                        skiped += 1;
                        continue;
                    }
                    var tmp = d[i - skiped];
                    d[i - skiped] = d[index];
                    d[index] = tmp;
                }
            });
        }

        function invertXEqual(value) {
            var leftEdges = x.range();
            var rangeBandWidth = timelineWidth / x.domain().length;
            for (var i = 0; value > (leftEdges[i] + rangeBandWidth / 2); i++) {
            }
            if (i > timepoints.length - 1) {
                i = timepoints.length - 1;
            }
            return x.domain()[i];
        }

        function invertXFromLeft(value) {
            var leftEdges = x.range();
            var rangeBandWidth = timelineWidth / x.domain().length;
            for (var i = 0; value > leftEdges[i]; i++) {
            }
            return x.domain()[i];
        }

        function invertXFromRight(value) {
            var leftEdges = x.range();
            var rangeBandWidth = timelineWidth / x.domain().length;
            for (var i = 0; value > leftEdges[i]; i++) {
            }
            return x.domain()[i - 1];
        }

        var svg = d3.select("#visualization").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        var contextMenu = d3.select("#visualization").append("div")
            .attr("class", "contextMenu text")
            .style("visibility", "hidden")
            .html("<input id='setColorButton' class='mybutton' type='button' value='Assign Unique Color' onclick='assignUniqueColor()'/><br/><input id='resetColorsButton' class='mybutton' type='button' value='Reset Line Colors' onclick='resetLineColors()'/>");

        d3.select('#visualization')
            .on("contextmenu", function () {
                d3.event.preventDefault();
                contextMenu
                    .style("visibility", "visible")
                    .style("left", mouseX() + 'px')
                    .style("top", mouseY() + 'px');
            });

        var tooltip = d3.select("#visualization").append("div")
            .attr("class", "tooltip text")
            .style("visibility", "hidden");

        function moveAxisBox(fromTimepoint, toTimepoint) {
            var tickWidth = x.range()[1];
            d3.select('.global.x.axis.box.timepoint-' + fromTimepoint.replace(/ /g, ''))
                .transition()
                .duration(100)
                .attr('x', x(toTimepoint) - tickWidth / 2);
            d3.select('.global.x.axis.text.timepoint-' + fromTimepoint.replace(/ /g, ''))
                .transition()
                .duration(100)
                .attr("transform", "translate(" + x(toTimepoint) + "," + (height + globalXAxisDist + 10 + padding()) + ")rotate(90)");
        }

        function swapTimepoints(fromIndex, toIndex) {
            moveAxisBox(timepoints[fromIndex], timepoints[toIndex]);
            moveAxisBox(timepoints[toIndex], timepoints[fromIndex]);
            var tmp = timepoints[toIndex];
            timepoints[toIndex] = timepoints[fromIndex];
            timepoints[fromIndex] = tmp;
            x.domain(timepoints);
            xAxis.scale(x);
        }

        function dragstart() {
            initBrushButtons();
        }

        function dragmove() {
            var xPos = d3.event.x;
            var timepointDragged = d3.select(this).property('__data__');
            var indexDragged = timepoints.indexOf(timepointDragged);
            var tickWidth = x.range()[1];
            var timepointHovered = invertXEqual(xPos);
            var indexHovered = timepoints.indexOf(timepointHovered);

            while (Math.abs(dist = indexDragged - indexHovered) > 0) {
                var toIndex = indexHovered;
                if (dist > 1) {
                    toIndex = indexDragged - 1;
                } else if (dist < -1) {
                    toIndex = indexDragged + 1;
                }
                swapTimepoints(indexDragged, toIndex);
                indexDragged = toIndex;
            }
        }

        function dragend() {
            var timepointDragged = d3.select(this).property('__data__');
            moveAxisBox(timepointDragged, timepointDragged);
            updateLineDataPropertyByTimepoints();
            updateTimelines(true);
            updateLocalXAxis();
        }

        var axisLabelDrag = d3.behavior.drag()
            .on('dragstart', dragstart)
            .on("drag", dragmove)
            .on('dragend', dragend);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        svg.append("g")
            .attr("class", "local x axis")
            .attr("transform", "translate(0," + (height + localXAxisDist + padding()) + ")")
            .call(xAxis)
            .selectAll("text")
            .attr('class', 'text')
            .attr("y", 10)
            .attr("x", 5)
            .attr("dy", ".35em")
            .attr("transform", "rotate(45)")
            .style("text-anchor", "start");

        svg.append("g")
            .attr("class", "global x axis")
            .attr("transform", "translate(0," + (height + globalXAxisDist + padding()) + ")")
            .call(xAxis)
            .selectAll("text")
            .attr('class', 'text')
            .attr('visibility', 'hidden');

        var globalXAxisLabel = svg.selectAll('.globalXAxisLabels')
            .data(timepoints)
            .enter()
            .append('g')
            .attr('class', 'draggableTimepoints')
            .call(axisLabelDrag);

        globalXAxisLabel
            .append('text')
            .attr('class', function (d) {
                return 'global x axis text timepoint-' + d.replace(/ /g, '');
            })
            .attr("transform", function (d) {
                return "translate(" + x(d) + "," + (height + globalXAxisDist + 10 + padding()) + ")rotate(90)";
            })
            .attr('dy', '0.35em')
            .attr("text-anchor", "start")
            .text(function (d) {
                return d;
            });

        maxTextWidth = getMaxWidth(d3.selectAll('.global.x.axis.text'));

        globalXAxisLabel
            .append('rect')
            .attr('class', function (d) {
                return 'global x axis box timepoint-' + d.replace(/ /g, '');
            })
            .attr('x', function (d) {
                return x(d) - x.range()[1] / 2;
            })
            .attr('y', height + globalXAxisDist + 10 - 2 + padding())
            .attr('width', timelineWidth / timepoints.length)
            .attr('height', maxTextWidth + 4);

        function smoothData(checked) {
            if (checked) {
                lineGen.interpolate('basis');
            } else {
                lineGen.interpolate('linear');
            }
            updateTimelines();
        }

        var lineGen = d3.svg.line()
            .defined(function (d) {
                return x.domain().indexOf(d.timepoint) !== -1;
            })
            .x(function (d) {
                return x(d.timepoint);
            })
            .y(function (d) {
                return y(d.value);
            })
            .interpolate('linear');

        function padding(i) {
            var space = 5;
            return i === undefined ? space * (concepts.length - 1) : space * i;
        }

        var timelineBoxText = svg.selectAll('.timelineBoxText')
            .data(concepts)
            .enter()
            .append('text')
            .attr('class', 'text')
            .attr("transform", function (d, i) {
                return "translate(" + (timelineWidth + 10) + "," + (i * timelineHeight + timelineHeight / 2 + padding(i)) + ")rotate(90)";
            })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text(function (d) {
                return shortenConcept(d);
            });

        var timelineBox = svg.selectAll('.timelineBox')
            .data(concepts)
            .enter()
            .append('rect')
            .attr('class', 'timeBox')
            .attr('width', timelineWidth)
            .attr('height', timelineHeight)
            .attr('x', 0)
            .attr('y', function (d, i) {
                return timelineHeight * i + padding(i);
            })
            .on('mousemove', function () {
                updateHoverLine(d3.mouse(this));
            });

        function updateHoverLine(point) {
            var timepoint = invertXEqual(point[0]);
            var x1 = x(timepoint);
            var x2 = x1;
            hoverlineX
                .attr('x1', x1)
                .attr('x2', x2)
                .style("visibility", "visible")
                .moveToFront();

            hoverlineY
                .attr('y1', point[1])
                .attr('y2', point[1])
                .style("visibility", "visible")
                .moveToFront();
        }

        function ownIndexOf(collection, filter) {
            for (var i = 0; i < collection.length; i++) {
                if (filter(collection[i], i, collection)) {
                    return i;
                }
            }
            return -1;
        }

        var hoverlineX = svg.append('line')
            .attr('class', 'hoverline')
            .attr('y1', 0)
            .attr('y2', height + localXAxisDist + 7)
            .style("visibility", "hidden");

        var hoverlineY = svg.append('line')
            .attr('class', 'hoverline')
            .attr('x1', -7)
            .attr('x2', timelineWidth)
            .style("visibility", "hidden");

        var brushZone = [-10, timelineWidth + 10];
        var axisBrush = d3.svg.brush()
            .x(d3.scale.identity().domain(brushZone))
            .extent(brushZone)
            .on("brush", function () {
                updateBrushButtonPos();
                axisBrushed();
            });

        var brushHeight = 50;
        svg.append("g")
            .attr("class", "x brush")
            .call(axisBrush)
            .selectAll('rect')
            .attr('y', height + globalXAxisDist + padding() - 0.5 * brushHeight)
            .attr('height', brushHeight);

        var brushButtonDragLeft = d3.behavior.drag()
            .on("drag", function () {
                return setBrushButtonPos('left', d3.event.x);
            });

        var brushButtonDragRight = d3.behavior.drag()
            .on("drag", function () {
                return setBrushButtonPos('right', d3.event.x);
            });

        var brushButtonWidth = 10;
        var brushButtonLeft = svg.append('rect')
            .attr('class', 'brushbutton left')
            .attr('y', height + globalXAxisDist + padding() - 0.25 * brushHeight)
            .attr('height', brushHeight / 2)
            .attr('width', brushButtonWidth)
            .call(brushButtonDragLeft);

        var brushButtonRight = svg.append('rect')
            .attr('class', 'brushbutton right')
            .attr('y', height + globalXAxisDist + padding() - 0.25 * brushHeight)
            .attr('height', brushHeight / 2)
            .attr('width', brushButtonWidth)
            .call(brushButtonDragRight);

        function setBrushButtonPos(button, xPos) {
            var minXPos = brushZone[0] - brushButtonWidth / 2;
            var maxXPos = brushZone[1] - brushButtonWidth / 2;
            xPos = xPos < minXPos ? minXPos : xPos;
            xPos = xPos > maxXPos ? maxXPos : xPos;
            if (button === 'left' && xPos >= parseInt(brushButtonRight.attr('x'))) {
                xPos = parseInt(brushButtonRight.attr('x')) - 1;
            } else if (button === 'right' && xPos <= parseInt(brushButtonLeft.attr('x'))) {
                xPos = parseInt(brushButtonLeft.attr('x')) + 1;
            }
            d3.select('.brushbutton.' + button)
                .attr('x', xPos);
            if (button === 'left') {
                axisBrush.extent([xPos + brushButtonWidth / 2, axisBrush.extent()[1]]);
            } else {
                axisBrush.extent([axisBrush.extent()[0], xPos + brushButtonWidth / 2]);
            }
            d3.select('.x.brush')
                .call(axisBrush);
            axisBrushed();
        }

        function initBrushButtons() {
            setBrushButtonPos('left', brushZone[0] - brushButtonWidth / 2);
            setBrushButtonPos('right', brushZone[1] - brushButtonWidth / 2);
            axisBrushed();
        }

        function updateBrushButtonPos() {
            var extent = axisBrush.extent();
            var x1 = extent[0];
            var x2 = extent[1];
            setBrushButtonPos('left', x1);
            setBrushButtonPos('right', x2);
        }

        var oldDomain = [];

        function axisBrushed() {
            x.domain(timepoints);
            var extent = axisBrush.extent();
            var x1 = extent[0];
            var x2 = extent[1];
            var startTimePoint = invertXFromLeft(x1);
            var stopTimePoint = invertXFromRight(x2);
            var domain = timepoints.slice(timepoints.indexOf(startTimePoint), timepoints.indexOf(stopTimePoint) + 1);
            if (axisBrush.empty()) {
                initBrushButtons();
                x.domain(timepoints);
            } else {
                x.domain(domain);
            }
            if (oldDomain && domain.toString() === oldDomain.toString()) {
                return;
            }
            oldDomain = domain.slice();
            xAxis.scale(x);
            updateTimelines();
            updateLocalXAxis();
        }

        function clearUnusedBrush(current) {
            for (var i = 0; i < timelineBrushes.length; i++) {
                if (i === current) {
                    continue;
                }
                d3.select('.brush.box-' + i)
                    .call(timelineBrushes[i].clear());
            }
        }

        function timelineBrushStart(box) {
            clearUnusedBrush(box);
        }

        var selectedPatientIDs = [];

        function timelineBrushed(box, yScale) {
            var extent = timelineBrushes[box].extent();
            var x1 = extent[0][0],
                y1 = extent[0][1],
                x2 = extent[1][0],
                y2 = extent[1][1];
            var startTimePoint = invertXFromLeft(x1);
            var stopTimePoint = invertXFromRight(x2);
            var xDomain = timepoints.slice(timepoints.indexOf(startTimePoint), timepoints.indexOf(stopTimePoint) + 1);
            var yDomain = [yScale.invert(y1), yScale.invert(y2)];

            var brushPath = svg.append('path')
                .attr('id', 'brushPolygon')
                .attr('d', 'M' + x1 + ' ' + y1 + 'L' + x2 + ' ' + y1 + 'L' + x2 + ' ' + y2 + 'L' + x1 + ' ' + y2 + 'Z')
                .style('fill', 'none')
                .node();
            d3.selectAll('.line')
                .classed('selected', false)
                .attr('opacity', 1);
            selectedTimepoints = xDomain;
            selectedPatientIDs = [];
            d3.selectAll('.line').each(function () {
                var line = d3.select(this);
                var linePath = line.node();
                var shape1 = new Path(linePath);
                var shape2 = new Path(brushPath);
                var intersections = Intersection.intersectShapes(shape1, shape2);
                if (intersections.status === 'Intersection') {
                    var patientID = d3.select(this).property('__data__')[0].patientID;
                    d3.selectAll('.line.patientID-' + patientID)
                        .classed('selected', true);
                    selectedPatientIDs.push(patientID);
                }
            });
            if (selectedPatientIDs.length > 0) {
                d3.selectAll('.line:not(.selected)')
                    .attr('opacity', 0.4);
            }
            d3.select('#brushPolygon').remove();
        }

        function clearControls() {
            contextMenu
                .style("visibility", "hidden");
            clearUnusedBrush(-1);
            d3.selectAll('.line')
                .classed('selected', false);
        }

        function updateUsedColorList() {
            usedColors = [];
            d3.selectAll('.line').each(function () {
                usedColors.push(d3.select(this).attr('stroke'));
            });
        }

        var uniqueColors = ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"];
        var usedColors = [];

        function getUnusedColor() {
            updateUsedColorList();
            for (var i = 0; i < uniqueColors.length; i++) {
                var color = uniqueColors[i];
                var index = usedColors.indexOf(color);
                if (index === -1) {
                    return color;
                }
            }
            return '';
        }

        function assignUniqueColor(ids) {
            ids = ids === undefined ? selectedPatientIDs : ids;
            if (ids.length === 0) {
                return;
            }
            clearControls();
            var color = getUnusedColor();
            if (color === '') {
                alert('Sorry, no more colors available!');
                return;
            }
            for (var i = 0; i < ids.length; i++) {
                var patientID = ids[i];
                d3.selectAll('.line.patientID-' + patientID)
                    .classed('assigned', true)
                    .attr('stroke', color);
            }
            d3.selectAll('.line')
                .attr('opacity', 1);
        }

        function resetLineColors() {
            usedColors = [];
            clearControls();
            for (var i = 0; i < patientIDs.length; i++) {
                var patientID = patientIDs[i];
                d3.selectAll('.line.patientID-' + patientID)
                    .classed('assigned', false)
                    .attr('opacity', 1)
                    .attr('stroke', colors(patientID));
            }
        }

        function updateGlobalXAxis() {
            svg.select(".global.x.axis")
                .call(xAxis)
                .selectAll("text")
                .attr('class', 'text')
                .attr("y", 0)
                .attr("x", 5)
                .attr("dy", ".35em")
                .attr("transform", "rotate(90)")
                .style("text-anchor", "start")
                .call(drag);
        }

        function updateLocalXAxis() {
            svg.select(".local.x.axis")
                .call(xAxis)
                .selectAll("text")
                .attr('class', 'text')
                .attr("y", 10)
                .attr("x", 5)
                .attr("dy", ".35em")
                .attr("transform", "rotate(45)")
                .style("text-anchor", "start");
        }

        function updateTimelines(animate) {
            var animationLength = animate ? 500 : 0;
            for (var i = 0; i < concepts.length; i++) {
                var concept = concepts[i];
                y = yScales[concept];
                svg.selectAll('.line.concept-' + i)
                    .transition()
                    .duration(animationLength)
                    .attr('d', lineGen);
            }
        }

        var timelineBrushes = [];

        function addBrushToTimelineBox(box, yScale) {
            timelineBrush = d3.svg.brush()
                .x(d3.scale.identity()
                    .domain([0, timelineWidth]))
                .y(d3.scale.identity()
                    .domain([box * timelineHeight + padding(box), (box + 1) * timelineHeight + padding(box)]))
                .on('brushstart', function () {
                    timelineBrushStart(box);
                })
                .on("brush", function () {
                    contextMenu
                        .style("visibility", "hidden");
                    timelineBrushed(box, yScale);
                });

            svg.append("g")
                .attr("class", "brush timlineBrush box-" + box)
                .on('mousemove', function () {
                    updateHoverLine(d3.mouse(this));
                })
                .on("mousedown", function () {
                    if (d3.event.button === 2) {
                        d3.event.stopImmediatePropagation();
                    }
                })
                .call(timelineBrush);

            timelineBrushes.push(timelineBrush);
        }

        function addYAxisToTimelineBox(box, yScale) {
            var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left");

            svg.append("g")
                .attr("class", "local y axis")
                .call(yAxis)
                .selectAll("text")
                .attr('class', 'text')
                .attr("dy", ".35em")
                .style("text-anchor", "end");
        }

        function highlightLine(patientID, that) {
            d3.selectAll('.line.patientID-' + patientID)
                .classed('hovered', true)
                .moveToFront();

            d3.selectAll('.line:not(.hovered)')
                .attr('opacity', 0.4);

            // if this method is called via mouse...
            if (that) {
                updateHoverLine(d3.mouse(that));
                tooltip
                    .style("visibility", "visible")
                    .html('PatientID: ' + patientID)
                    .style("left", mouseX() + "px")
                    .style("top", mouseY() + "px");
            }
        }

        function lowlightLine() {
            d3.selectAll('.line')
                .classed('hovered', false)
                .attr('opacity', 1);
            if (selectedPatientIDs.length > 0) {
                d3.selectAll('.line:not(.selected)')
                    .attr('opacity', 0.4);
            }
            tooltip
                .style("visibility", "hidden");
        }

        function lineSelected(d) {
            var patientID = d[0].patientID;
            if (!d3.select('.line.patientID-' + patientID).classed('hovered')) { // fix for IE
                lineUnselected();
                highlightLine(patientID, this);
                computeAutoCorrelationLines(patientID, this);
            }
        }

        function lineUnselected() {
            lowlightLine();
            removeAutoCorrelationLines();
        }

        function removeAutoCorrelationLines() {
            d3.selectAll('.correlogram')
                .remove();
        }

        function drawCorrelogram(points, concept) {
            var conceptIdx = concepts.indexOf(concept);
            var extent = d3.extent(points, function (d) {
                return d.value;
            });
            var barScale = d3.scale.linear()
                .domain([1, -1])
                .range([timelineHeight * conceptIdx + padding(conceptIdx), timelineHeight * (conceptIdx + 1) + padding(conceptIdx)]);
            svg.append('line')
                .attr('class', 'axis correlogram' + ' concept-' + conceptIdx)
                .attr('x1', 0)
                .attr('y1', barScale(0))
                .attr('x2', timelineWidth)
                .attr('y2', barScale(0))
                .attr('stroke', function () {
                    if (backgroundCheckChecked) {
                        return 'black';
                    } else {
                        return 'white';
                    }
                });
            svg.selectAll('.correlogramBars')
                .data(points)
                .enter()
                .append('rect')
                .attr('class', 'bar correlogram' + ' concept-' + conceptIdx)
                .attr('width', '1px')
                .attr('height', function (d) {
                    return Math.abs(barScale(d.value) - barScale(0));
                })
                .attr('x', function (d) {
                    return x(d.timepoint);
                })
                .attr('y', function (d) {
                    return barScale(Math.max(0, d.value));
                })
                .attr('stroke', function () {
                    if (backgroundCheckChecked) {
                        return 'black';
                    } else {
                        return 'white';
                    }
                });
        }

        var showCorrelogram = true;

        function swapCorrelogramBoolean(checked) {
            showCorrelogram = checked;
        }

        function computeAutoCorrelationLines(patientID, secondTry) {
            if (!showCorrelogram) {
                return;
            }

            var settings = {acfPatientID: patientID, xAxisSortOrder: x.domain(), interpolateNAs: interpolateNAs};

            var onResponse = function (response) {
                var acfEstimates = response.acfEstimates;
                for (var i = 0; i < concepts.length; i++) {
                    var concept = concepts[i];
                    var acfEstimate = acfEstimates[concept];
                    var points = [];
                    for (var j = 0, len = acfEstimate.estimate.length; j < len; j++) {
                        points.push({'value': acfEstimate.estimate[j], 'timepoint': acfEstimate.sortOrder[j]});
                    }
                    drawCorrelogram(points, concept);
                }

                if (!d3.selectAll('.line.hovered').size()) {
                    removeAutoCorrelationLines();
                }

            };

            startWorkflow(onResponse, settings, false, false);
        }

        function getEqualityCheck(concept, timepoint, patientID, value) {
            return function (d) {
                var b1 = concept === undefined ? true : d.concept === concept;
                var b2 = timepoint === undefined ? true : d.timepoint === timepoint;
                var b3 = patientID === undefined ? true : d.patientID === patientID;
                var b4 = value === undefined ? true : d.value === value;
                return b1 && b2 && b3 && b4;
            };
        }

        function uniq_fast(a) {
            var seen = {};
            var out = [];
            for (var i = 0, j = 0, len = a.length; i < len; i++) {
                var item = a[i];
                if (seen[item] !== 1) {
                    seen[item] = 1;
                    out[j++] = item;
                }
            }
            return out;
        }

        var yScales = {};
        for (var i = 0; i < concepts.length; i++) {
            var concept = concepts[i];
            var conceptData = data.filter(getEqualityCheck(concept, undefined, undefined, undefined));
            var conceptPatientIDs = uniq_fast(conceptData.map(function (d) {
                return d.patientID;
            }));
            var extent = d3.extent(conceptData, function (d) {
                return d.value;
            });
            var yScale = d3.scale.linear()
                .domain(extent.reverse())
                .range([timelineHeight * i + padding(i), timelineHeight * (i + 1) + padding(i)]);
            yScales[concept] = yScale;
            y = yScale;
            addBrushToTimelineBox(i, yScale);
            addYAxisToTimelineBox(i, yScale);
            for (var j = 0; j < conceptPatientIDs.length; j++) {
                var patientID = conceptPatientIDs[j];
                var patientConceptData = data.filter(getEqualityCheck(concept, undefined, patientID, undefined));
                timeline = svg.selectAll('.timelines')
                    .data([patientConceptData])
                    .enter()
                    .append('path')
                    .attr('class', 'line concept-' + i + ' patientID-' + patientID)
                    .attr('d', lineGen)
                    .attr('stroke', colors(patientID))
                    .on('mouseover', lineSelected)
                    .on('mouseout', lineUnselected)
                    .on('mousemove', function () {
                        updateHoverLine(d3.mouse(this));
                    });
            }
        }
        initBrushButtons();

        function removePointsWithProperties(arr, concept, timepoint, patientID, value) {
            var equalityCheck = getEqualityCheck(concept, timepoint, patientID, value);
            var newArray = [];
            for (var i = 0; i < arr.length; i++) {
                if (!equalityCheck(arr[i])) {
                    newArray.push(arr[i]);
                }
            }
            return newArray;
        }

        function removeDendrograms() {
            svg.selectAll(".dendrogram").remove();
        }

        function drawDendrogram(dendrogram, ids, fromHeight, toHeight) {
            var w = 280;
            var h = toHeight - fromHeight;
            var cluster = d3.layout.cluster()
                .size([h, w])
                .separation(function (a, b) {
                    return 1;
                });

            var diagonal = d3.svg.diagonal()
                .projection(function (d) {
                    return [width + margin.right - 20 - d.y, fromHeight + d.x];
                });

            var dendrogramNodes = cluster.nodes(dendrogram);
            var dendrogramLinks = cluster.links(dendrogramNodes);

            dendrogramLink = svg.selectAll(".dendrogramLink")
                .data(dendrogramLinks)
                .enter().append("path")
                .attr("class", "dendrogram link")
                .attr("d", diagonal);

            dendrogramNode = svg.selectAll(".dendrogramNode")
                .data(dendrogramNodes)
                .enter().append("circle")
                .attr("class", "dendrogram node")
                .attr('r', 4.5)
                .attr("transform", function (d) {
                    return "translate(" + (width + margin.right - 20 - d.y) + "," + (fromHeight + d.x) + ")";
                })
                .on("mouseover", function (d) {
                    var leafs = d.index.split(' ');
                    for (var i = 0; i < leafs.length; i++) {
                        var patientID = ids[leafs[i]];
                        highlightLine(patientID);
                    }

                    tooltip
                        .style("visibility", "visible")
                        .html('Height: ' + d.height)
                        .style("left", mouseX() + "px")
                        .style("top", mouseY() + "px");
                })
                .on('mouseout', function () {
                    lowlightLine();
                    tooltip.style("visibility", "hidden");
                })
                .on('click', function (d) {
                    var leafs = d.index.split(' ');
                    var clickedIDs = [];
                    for (var i = 0; i < leafs.length; i++) {
                        var patientID = ids[leafs[i]];
                        clickedIDs.push(patientID);
                    }
                    assignUniqueColor(clickedIDs);
                });
        }

        var interpolateNAs = 1;

        function swapInterpolateBoolean(checked) {
            if (!checked) {
                alert('Missing timepoints are no longer interpolated.\nThis can massively influence the analysis algorithms (i.e. clustering)\n\nDEACTIVATE ONLY IF YOU KNOW WHAT YOU DO!');
                interpolateNAs = 0;
            } else {
                interpolateNAs = 1;
            }
        }

        function cluster(dist, link) {
            removeDendrograms();
            var similarityMeasure = dist;
            var linkageMeasure = link;
            var settings = {
                similarityMeasure: similarityMeasure,
                linkageMeasure: linkageMeasure,
                interpolateNAs: interpolateNAs,
                xAxisSortOrder: x.domain()
            };
            clusteringDropdown.select('.buttonText').text('Loading...');

            var onResponse = function (response) {
                clusteringDropdown.select('.buttonText').text('Timeline Clustering');
                for (var i = 0; i < concepts.length; i++) {
                    var concept = concepts[i];
                    var dendrogram = JSON.parse(response.clusterings[concept].dendrogram);
                    var fromHeight = timelineHeight * i + padding(i);
                    var toHeight = timelineHeight * (i + 1) + padding(i);
                    var ids = response.clusterings[concept].patientIDs;
                    drawDendrogram(dendrogram, ids, fromHeight, toHeight);
                }
            };

            startWorkflow(onResponse, settings, false, false);
        }

        var buttonWidth = 200;
        var buttonHeight = 40;
        var buffer = 5;

        var clusteringDropdown = createD3Dropdown({
            location: svg,
            label: 'Timeline Clustering',
            x: 2 - margin.left,
            y: 2 - margin.top,
            width: buttonWidth,
            height: buttonHeight,
            items: [
                {
                    callback: function () {
                        cluster('COR', 'average');
                    },
                    label: 'Hierarch.-Corr.-Avg.'
                },
                {
                    callback: function () {
                        cluster('EUCL', 'average');
                    },
                    label: 'Hierarch.-Eucl.-Avg.'
                },
                {
                    callback: function () {
                        cluster('ACF', 'average');
                    },
                    label: 'Hierarch.-Autocorr.-Avg.'
                }
            ]
        });

        createD3Button({
            location: svg,
            label: 'Reset Colors',
            x: 2 - margin.left + buffer + buttonWidth,
            y: 2 - margin.top,
            width: buttonWidth,
            height: buttonHeight,
            callback: resetLineColors
        });

        createD3Switch({
            location: svg,
            onlabel: 'Interp. Miss. Data ON',
            offlabel: 'Interp. Miss. Data OFF',
            x: 2 - margin.left + buffer * 2 + buttonWidth * 2,
            y: 2 - margin.top,
            width: buttonWidth,
            height: buttonHeight,
            callback: swapInterpolateBoolean,
            checked: true
        });

        createD3Switch({
            location: svg,
            onlabel: 'Dark Background',
            offlabel: 'Light Background',
            x: 2 - margin.left + buffer * 3 + buttonWidth * 3,
            y: 2 - margin.top,
            width: buttonWidth,
            height: buttonHeight,
            callback: swapBackgroundColor,
            checked: true
        });

        createD3Switch({
            location: svg,
            onlabel: 'Smooth Data ON',
            offlabel: 'Smooth Data OFF',
            x: 2 - margin.left + buffer * 4 + buttonWidth * 4,
            y: 2 - margin.top,
            width: buttonWidth,
            height: buttonHeight,
            callback: smoothData,
            checked: false
        });

        createD3Switch({
            location: svg,
            onlabel: 'SHOW Correlogram',
            offlabel: 'HIDE Correlogram',
            x: 2 - margin.left + buffer * 5 + buttonWidth * 5,
            y: 2 - margin.top,
            width: buttonWidth,
            height: buttonHeight,
            callback: swapCorrelogramBoolean,
            checked: true
        });
    }

}]);

angular.module('smartRApp')
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state('timeline', {
                parent: 'site',
                url: '/timeline',
                views: {
                    '@': {
                        templateUrl: 'src/containers/timeline/timeline.html'
                    },
                    'content@timeline': {
                        templateUrl: 'src/containers/timeline/timeline.content.html'
                    },
                    'sidebar@timeline': {
                        templateUrl: 'app/components/sidebar/sidebar.html',
                        controller: 'SidebarCtrl',
                        controllerAs: 'vm'
                    }
                }
            });
    }]);
