angular.module('pablo')
  .controller('listServicesController', ["$scope", "$state", "restService", function ($scope, $state, restService) {
    var self = this;

    self.getServices = function () {
      restService.getServices().then(function (services) {
        self.services = services;
      });
    };

    self.delete = function (item) {
      var result = confirm("Are you sure?");
      if (result) {
        restService.delete("services/" + item._id, null).then(function (result) {
          window.toastr.success("Success");
          self.init();
        });
      }
    }

    self.init = function () {
      self.getServices();
    };

    self.init();

  }]);