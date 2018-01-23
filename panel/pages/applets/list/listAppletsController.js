angular.module('pablo')
  .controller('listAppletsController', ["$scope", "$state", "restService", function ($scope, $state, restService) {
    var self = this;

    self.getApplets = function () {
      restService.get("applets", null).then(function (applets) {
        self.applets = applets;
      });
    };

    self.delete = function (item) {
      var result = confirm("Are you sure?");
      if (result) {
        restService.delete("applets/" + item._id, null).then(function (result) {
          window.toastr.success("Success");
          self.init();
        });
      }
    }

    self.init = function () {
      self.getApplets();
    };

    self.init();

  }]);