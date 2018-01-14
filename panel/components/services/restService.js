angular.module("pablo")
  .factory('restService', ['$http', '$rootScope', 'constants', function ($http, $rootScope, constants) {
    var service = [];
    var serviceBase = constants.apiUrl;

    service.login = function (parameters) {
      return $http.post(serviceBase + 'auth/login', parameters).then(function (result) {
        return result.data;
      });
    };

    service.register = function (parameters) {
      return $http.post(serviceBase + 'auth/register', parameters).then(function (result) {
        return result.data;
      });
    };

    service.getServices = function (parameters) {
      return $http.get(serviceBase + 'services', { params: parameters }).then(function (result) {
        return result.data;
      });
    };

    service.get = function (parameters) {
      return $http.get(serviceBase + 'api/signup?emailAddress=', { params: parameters }).then(function (result) {
        return result.data;
      });
    };

    service.post = function (parameters) {
      return $http.post(serviceBase + 'api/registerUser', parameters).then(function (result) {
        return result.data;
      });
    };

    return service;
  }]);