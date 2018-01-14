angular.module("pablo").factory('authService', ['$rootScope', 'localStorageService', 'restService', '$q',
  function ($rootScope, localStorageService, restService, $q) {
    var service = [];
    service.isAuth = false;
    service.user = null;

    service.checkForUser = function () {
      console.log('checking for user');
      var user = localStorageService.get('panel.user');
      var token = localStorageService.get('panel.token');
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
        if (data) {
          service.isAuth = true;
          service.user = data.user;
          localStorageService.set('panel.user', data.user);
          localStorageService.set('panel.token', data.token);
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
        if (data.success) {
          service.isAuth = true;
          service.token = data.token;
          service.myRoles = data.user.role;
          localStorageService.set('panel.token', data.token);
          localStorageService.set('panel.user', data.user);
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
      localStorageService.removeAll();
      $rootScope.$broadcast('logoutCompleted');
    };

    $rootScope.$on('shouldLogout', function () {
      service.logout();
    });

    return service;
  }]);