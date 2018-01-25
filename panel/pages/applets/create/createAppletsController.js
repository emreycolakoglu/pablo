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

    self.selectService = function(service){
      self.step = 2;
      self.getActions(service._id);
    };

    self.getActions = function(serviceId){
      restService.get("services/" + serviceId + "/actions", null).then(function(actions){
        self.actions = actions;
      });
    };

    self.init = function () {
      self.getServices();
    };

    self.init();

  }]);