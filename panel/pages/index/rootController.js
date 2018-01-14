angular.module('pablo')
  .controller('rootController', ["$scope", "$state", "authService", "routeList", function ($scope, $state, authService, routeList) {
    var rootVm = this;

    rootVm.routes = routeList;

    rootVm.logout = function () {
      authService.logout();
    }

    $scope.$on("logoutCompleted", function(){
      $state.go("login");
    });
  }]);