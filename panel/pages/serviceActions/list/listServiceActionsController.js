angular.module('pablo')
  .controller('listServiceActionsController', ["$scope", "$state", "restService", function ($scope, $state, restService) {
    var self = this;

    self.getServiceActions = function () {
      restService.get("serviceActions", null).then(function (serviceActions) {
        self.serviceActions = serviceActions;
      });
    };

    self.delete = function (item) {
      var result = confirm("Are you sure?");
      if (result) {
        restService.delete("serviceActions/" + item._id, null).then(function (result) {
          window.toastr.success("Success");
          self.init();
        });
      }
    }

    self.init = function () {
      self.getServiceActions();
    };

    self.init();

  }]);