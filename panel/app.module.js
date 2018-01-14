angular.module("pablo", ["oc.lazyLoad", "ui.router", "ui.bootstrap", "LocalStorageModule"])
  .constant('constants', {
    apiUrl: window.location.protocol + '//localhost:3000/api/'
  })
  .run(["$rootScope", "authService", "$state", function ($rootScope, authService, $state) {
    authService.checkForUser();
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
      if (toState.name == 'login' && authService.isAuth) {
        $state.go("dashboard.index");
        event.preventDefault();
      }
      if (toState.authenticate && !authService.isAuth) {
        // User isn’t authenticated
        $state.go("login");
        event.preventDefault();
      }
    });
  }])
  .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', 'routeListProvider',
    function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, routeListProvider) {
      $ocLazyLoadProvider.config({
        debug: false,
        events: true,
      });

      console.log(routeListProvider.routes);

      routeListProvider.routes.forEach(function (route) {
        var newRouteObject = {
          url: route.url
        }
        if (route.controller)
          newRouteObject.controller = route.controller;
        if (route.controllerAs)
          newRouteObject.controllerAs = route.controllerAs;
        if (route.templateUrl)
          newRouteObject.templateUrl = route.templateUrl;
        if (route.authenticate)
          newRouteObject.authenticate = route.authenticate;
        if (route.abstract)
          newRouteObject.abstract = route.abstract;
        if (route.lazyLoadFiles)
          newRouteObject.resolve = {
            loadMyFiles: function ($ocLazyLoad) {
              return $ocLazyLoad.load(route.lazyLoadFiles)
            }
          }
        $stateProvider.state(route.stateName, newRouteObject);
      });

      $stateProvider
        .state('dashboard.services', {
          url: "/services",
          abstract: true,
          template: "<ui-view/>"
        })
        .state('dashboard.services.list', {
          url: "/list",
          templateUrl: "/asset/pages/services/list/listServices.html",
          controller: "listServicesController",
          controllerAs: "self",
          authenticate: true,
          resolve: {
            loadMyFiles: function ($ocLazyLoad) {
              return $ocLazyLoad.load(
                {
                  name: 'pablo',
                  files: [
                    '/asset/pages/services/list/listServicesController.js',
                    '/asset/components/services/restService.js'
                  ]
                })
            }
          }
        });

      $urlRouterProvider.otherwise('/');
    }]);