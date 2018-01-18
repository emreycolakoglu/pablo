angular.module("pablo").factory('authInterceptorService', ['$q', '$injector', 'localStorageService', 'constants',
  function ($q, $injector, localStorageService, constants) {

    var authInterceptorServiceFactory = {};
    var $http, $state;

    var _request = function (config) {

      config.headers = config.headers || {};

      if (config.url.indexOf(constants.apiUrl) > -1) {
        //GET YOUR TOKEN HERE
        var token = localStorageService.get('pablo.token');
        if (token && !config.noHeader) {
          var prefix = config.url.indexOf('?') > -1 ? '&' : '?';
          //if url parameter, uncomment the line below
          //config.url = config.url + prefix + 'access_token=' + token;
          //if bearer token, use the line below
          config.headers.Authorization = "Bearer "+token;
        }
      }

      return config;
    };

    var _responseError = function (rejection) {
      var deferred = $q.defer();
      if (rejection.status === 401) {
        var authService = $injector.get('authService');
        authService.logout();
        $state = $injector.get('$state');
        $state.go('login');
        deferred.reject(rejection);
      } else {
        deferred.reject(rejection);
      }
      return deferred.promise;
    };

    var _retryHttpRequest = function (config, deferred) {
      $http = $http || $injector.get('$http');
      $http(config).then(function (response) {
        deferred.resolve(response);
      }, function (response) {
        deferred.reject(response);
      });
    };

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
  }]);