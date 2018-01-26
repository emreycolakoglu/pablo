angular.module('pablo')
  .controller('createAppletsController', ["$scope", "$state", "restService", function ($scope, $state, restService) {
    var self = this;
    self.services = [];
    self.selectedService = {};
    self.step = 1;

    self.getServices = function(){
      restService.get("services", null).then(function(services){
        self.services = services;
      });
    };

    self.selectService = function(service){
      self.selectedService = service;
      if(self.selectedService.requireAuth){
        self.step = 2;
      }
      else{
        self.step = 3;
        self.getActions(self.selectedService._id);
      }
      
    };

    self.saveServiceUserPassCredentials = function(){
      self.step = 3;
      self.getActions(self.selectedService._id);
    }

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