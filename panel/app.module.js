angular.module("pablo", ["oc.lazyLoad", "ui.router", "ui.bootstrap"])
  .constant('constants', {
    apiUrl: window.location.protocol + '//localhost:3000/api/'
  })
  .run(["$rootScope", function ($rootScope) {
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
      if (toState.name == 'login' /* && authService.isAuth */) {
        //$state.go("panel.index");
        //event.preventDefault();
      }
      if (toState.authenticate /* && !authService.isAuth*/) {
        // User isn’t authenticated
        $state.go("login");
        event.preventDefault();
      }
    });
  }])
  .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
    function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
      $ocLazyLoadProvider.config({
        debug: false,
        events: true,
      });

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('login', {
          url: '/',
          controller: 'loginController',
          controllerAs: 'self',
          templateUrl: '/asset/pages/login/login.html',
          resolve: {
            loadMyFiles: function ($ocLazyLoad) {
              return $ocLazyLoad.load(
                {
                  name: 'pablo',
                  files: [
                    '/asset/pages/login/loginController.js',
                    '/asset/components/services/apiService.js'
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