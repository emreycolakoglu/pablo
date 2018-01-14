angular.module('pablo')
  .controller('loginController', ["$scope", "$state", "authService", function ($scope, $state, authService) {
    var self = this;

    self.doLogin = function () {
      authService.login({
        email: self.email,
        password: self.password
      });
    }

    $scope.$on("loginCompleted", function(){
      $state.go("dashboard.index");
    });

    $scope.$on("loginError", function(){
      toastr.error("An error occurred");
    });

    self.test = "emre";
  }]);