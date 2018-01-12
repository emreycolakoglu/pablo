angular.module("pablo", ["oc.lazyLoad", "ui.router", "ui.bootstrap"])
  .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
    function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
      $ocLazyLoadProvider.config({
        debug: false,
        events: true,
      });

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('login', {
          url: '/login',
          controller: 'loginController',
          controllerAs: 'self',
          templateUrl: 'panel/login.html',
          resolve: {
            loadMyFiles: function ($ocLazyLoad) {
              return $ocLazyLoad.load(
                {
                  name: 'pablo',
                  files: [
                    'panel/loginController.js'
                  ]
                })
            }
          }
        })
        /*.state('dashboard.home', {
          url: '/home',
          controller: 'MainCtrl',
          templateUrl: 'views/dashboard/home.html',
          resolve: {
            loadMyFiles: function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'sbAdminApp',
                files: [
                  'scripts/controllers/main.js',
                  'scripts/directives/timeline/timeline.js',
                  'scripts/directives/notifications/notifications.js',
                  'scripts/directives/chat/chat.js',
                  'scripts/directives/dashboard/stats/stats.js'
                ]
              })
            }
          }
        })*/
    }]);