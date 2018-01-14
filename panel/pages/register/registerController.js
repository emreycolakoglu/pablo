angular.module('pablo')
  .controller('registerController', ["$scope", "$state", "authService", function ($scope, $state, authService) {
    var self = this;

    self.doRegister = function () {
      authService.register({
        email: self.email,
        password: self.password
      });
    };

    $scope.$on("registerCompleted", function(){
      $state.go("dashboard.index");
    });

    $scope.$on("registerError", function(){
      toastr.error("An error occurred");
    });

    self.test = "emre";
  }]);