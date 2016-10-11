angular.module('smartRApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('volcanoplot', {
                parent: 'site',
                url: '/volcanoplot',
                views: {
                    '@': {
                        templateUrl: 'app/SmartR/containers/volcanoplot/volcanoplot.html'
                    },
                    'content@volcanoplot': {
                        templateUrl: 'app/SmartR/containers/volcanoplot/volcanoplot.content.html'
                    },
                    'sidebar@volcanoplot': {
                        templateUrl: 'app/components/sidebar/sidebar.html',
                        controller: 'SidebarCtrl',
                        controllerAs: 'vm'
                    }
                }
            });
    });
