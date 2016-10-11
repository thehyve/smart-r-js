angular.module('smartRApp')
    .config(function ($stateProvider) {
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
    });
