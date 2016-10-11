angular.module('smartRApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('timeline', {
                parent: 'site',
                url: '/timeline',
                views: {
                    '@': {
                        templateUrl: 'app/SmartR/containers/timeline/timeline.html'
                    },
                    'content@timeline': {
                        templateUrl: 'app/SmartR/containers/timeline/timeline.content.html'
                    },
                    'sidebar@timeline': {
                        templateUrl: 'app/components/sidebar/sidebar.html',
                        controller: 'SidebarCtrl',
                        controllerAs: 'vm'
                    }
                }
            });
    });
