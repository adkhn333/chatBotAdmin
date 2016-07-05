app
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('/', {
            abstract: true,
            views: {
                'main-view': {
                    templateUrl: 'templates/admin-page.html', 
                    controller: 'mainCtrl'
                }
            }
        })
        .state('/.filters', {
            url: '/',
            views: {
                'secondary-view': {
                    templateUrl: 'templates/filters.html', 
                    controller: 'filterCtrl'
                }
            }
        })
        .state('/.project-status', {
            // url: '/project-status',
            views: {
                'secondary-view': {
                    templateUrl: 'templates/project-status.html', 
                    controller: 'filterCtrl'
                }
            }
        })
        .state('/.cost', {
            // url: '/cost',
            views: {
                'secondary-view': {
                    templateUrl: 'templates/cost.html', 
                    controller: 'filterCtrl'
                }
            }
        })
        .state('/.other', {
            // url: '/other',
            views: {
                'secondary-view': {
                    templateUrl: 'templates/other.html', 
                    controller: 'filterCtrl'
                }
            }
        })
        .state('/.configurations', {
            // url: '/configurations',
            views: {
                'secondary-view': {
                    templateUrl: 'templates/configurations.html', 
                    controller: 'filterCtrl'
                }
            }
        })
        .state('/.nearby', {
            // url: '/nearby',
            views: {
                'secondary-view': {
                    templateUrl: 'templates/nearby.html', 
                    controller: 'filterCtrl'
                }
            }
        })
        .state('/.rating', {
            // url: '/rating',
            views: {
                'secondary-view': {
                    templateUrl: 'templates/rating.html', 
                    controller: 'filterCtrl'
                }
            }
        })
        .state('/.top', {
            // url: '/top',
            views: {
                'secondary-view': {
                    templateUrl: 'templates/top.html', 
                    controller: 'filterCtrl'
                }
            }
        })
        .state('/.location', {
            // url: '/location',
            views: {
                'secondary-view': {
                    templateUrl: 'templates/location.html', 
                    controller: 'filterCtrl'
                }
            }
        })
        .state('/.security', {
            // url: '/security',
            views: {
                'secondary-view': {
                    templateUrl: 'templates/security.html', 
                    controller: 'filterCtrl'
                }
            }
        })
        .state('/.club-house', {
            // url: '/club-house',
            views: {
                'secondary-view': {
                    templateUrl: 'templates/club-house.html', 
                    controller: 'filterCtrl'
                }
            }
        })  
        .state('/.sport-activities', {
            // url: '/sport-activities',
            views: {
                'secondary-view': {
                    templateUrl: 'templates/sport-activities.html', 
                    controller: 'filterCtrl'
                }
            }
        })   
        .state('/.specifications', {
            // url: '/specifications',
            views: {
                'secondary-view': {
                    templateUrl: 'templates/specifications.html', 
                    controller: 'filterCtrl'
                }
            }
        })       
        .state('/.project-details', {
            // url: '/project-details',
            views: {
                'secondary-view': {
                    templateUrl: 'templates/project-details.html', 
                    controller: 'filterCtrl'
                }
            }
        })        
        ;
    $urlRouterProvider.otherwise('/');
})
;