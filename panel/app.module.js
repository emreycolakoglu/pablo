angular.module("pablo", ["oc.lazyLoad", "ui.router", "ui.bootstrap", "LocalStorageModule"])
  .constant('constants', {
    apiUrl: `${window.location.protocol}//${window.location.host}/api/`
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
  .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', 'routeListProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, routeListProvider, $httpProvider) {
      $ocLazyLoadProvider.config({
        debug: false,
        events: true,
      });
      $httpProvider.interceptors.push('authInterceptorService');

      var registerRoutes = function (routes) {
        if (routes && routes.length) {
          routes.forEach(function (route) {
            registerRoute(route);
          })
        }
      };

      var registerRoute = function (route) {
        var newRouteObject = {
          url: route.url
        }
        if (route.controller)
          newRouteObject.controller = route.controller;
        if (route.controllerAs)
          newRouteObject.controllerAs = route.controllerAs;
        if (route.templateUrl)
          newRouteObject.templateUrl = route.templateUrl;
        if (route.template)
          newRouteObject.template = route.template;
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

        if (route.subRoutes && route.subRoutes.length) {
          registerRoutes(route.subRoutes);
        }
      };

      registerRoutes(routeListProvider.routes);

      $urlRouterProvider.otherwise('/');
    }]);