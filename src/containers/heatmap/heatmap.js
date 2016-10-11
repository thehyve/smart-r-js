angular.module('smartRApp')
    .config(function ($stateProvider) {
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
    });
