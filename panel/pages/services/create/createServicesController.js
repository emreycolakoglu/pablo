angular.module('pablo')
  .controller('createServicesController', ["$scope", "$state", "restService", "$stateParams", function ($scope, $state, restService, $stateParams) {
    var self = this;
    self.request = {};
    self.authMethods= [{
      value: 1,
      label: "Username & Password"
    },{
      value: 2,
      label: "OAuth"
    }];

    self.save = function () {
      if ($stateParams.id) {
        restService.patch("services/" + $stateParams.id, self.request).then(function (result) {
          window.toastr.success("Success");
          self.reset();
          $state.go($state.$current.parent.self.name + '.list');
        }).catch(function (error) {
          window.toastr.error("Error");
        });
      }
      else {
        restService.post("services", self.request).then(function (result) {
          window.toastr.success("Success");
          self.reset();
          $state.go($state.$current.parent.self.name + '.list');
        }).catch(function (error) {
          window.toastr.error("Error");
        });
      }
    };

    self.reset = function () {
      self.request = {};
    };

    self.init = function () {
      if ($stateParams.id) {
        restService.get("services/" + $stateParams.id, null).then(function (result) {
          self.request = result;
        }).catch(function (error) {
          window.toastr.error("Error");
        })
      }
    }

    self.init();

  }]);