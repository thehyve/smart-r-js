angular.module('smartRApp')
    .config(function ($stateProvider) {
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
    });
