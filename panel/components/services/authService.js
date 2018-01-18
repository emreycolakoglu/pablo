angular.module("pablo").factory('authService', ['$rootScope', 'localStorageService', 'restService', '$q',
  function ($rootScope, localStorageService, restService, $q) {
    var service = [];
    service.isAuth = false;
    service.user = null;

    service.checkForUser = function () {
      console.log('checking for user');
      var user = localStorageService.get('pablo.user');
      var token = localStorageService.get('pablo.token');
      service.user = user;
      if (user) {
        service.isAuth = true;
      }
      else {
        service.isAuth = false;
      }
    };

    service.login = function (req) {
      restService.login(req).then(function (data) {
        if (data && data.token) {
          service.isAuth = true;
          service.user = data.user;
          service.myRoles = data.user.roles;
          localStorageService.set('pablo.user', data.user);
          localStorageService.set('pablo.token', data.token);
          $rootScope.$broadcast('loginCompleted');
        }
        else {
          service.isAuth = false;
          $rootScope.$broadcast('loginError');
        }
      }, function (err) {
        service.isAuth = false;
        $rootScope.$broadcast('loginError');
      });
    };

    service.register = function (req) {
      restService.register(req).then(function (data) {
        if (data && data.token) {
          service.isAuth = true;
          service.token = data.token;
          service.myRoles = data.user.roles;
          localStorageService.set('pablo.token', data.token);
          localStorageService.set('pablo.user', data.user);
          $rootScope.$broadcast('registerCompleted');
        }
        else {
          console.log('auth else');
          service.isAuth = false;
          $rootScope.$broadcast('registerError');
        }
      }, function (err) {
        console.log('auth error');
        service.isAuth = false;
        $rootScope.$broadcast('registerError');
      });
    };

    service.logout = function () {
      service.isAuth = false;
      localStorageService.clearAll();
      $rootScope.$broadcast('logoutCompleted');
    };

    $rootScope.$on('shouldLogout', function () {
      service.logout();
    });

    return service;
  }]);