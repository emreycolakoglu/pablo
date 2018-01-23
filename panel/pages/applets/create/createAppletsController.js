angular.module('pablo')
  .controller('createAppletsController', ["$scope", "$state", "restService", function ($scope, $state, restService) {
    var self = this;
    self.services = [];
    self.step = 1;

    self.getServices = function(){
      restService.get("services", null).then(function(services){
        self.services = services;
      });
    };

    self.init = function () {
      self.getServices();
    };

    self.init();

  }]);