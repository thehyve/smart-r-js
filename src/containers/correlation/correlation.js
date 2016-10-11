angular.module('smartRApp')
    .config(function ($stateProvider) {
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
    });
