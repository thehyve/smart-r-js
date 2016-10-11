angular.module('smartRApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('correlation', {
                parent: 'site',
                url: '/correlation',
                views: {
                    '@': {
                        templateUrl: 'app/SmartR/containers/correlation/correlation.html'
                    },
                    'content@correlation': {
                        templateUrl: 'app/SmartR/containers/correlation/correlation.content.html'
                    },
                    'sidebar@correlation': {
                        templateUrl: 'app/components/sidebar/sidebar.html',
                        controller: 'SidebarCtrl',
                        controllerAs: 'vm'
                    }
                }
            });
    });
