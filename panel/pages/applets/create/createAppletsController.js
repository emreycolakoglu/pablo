angular.module('pablo')
  .controller('createAppletsController', ["$scope", "$state", "restService", function ($scope, $state, restService) {
    var self = this;
    self.applet = {};
    self.services = [];
    self.selectedService = {};
    self.selectedAction = {};
    self.step = 0;

    self.saveApplet = function () {
      self.step = 1;
    };

    self.getServices = function () {
      restService.get("services", null).then(function (services) {
        self.services = services;
      });
    };

    self.selectService = function (service) {
      self.selectedService = service;
      if (self.selectedService.requireAuth) {
        self.step = 2;
      }
      else {
        self.step = 3;
        self.getActions(self.selectedService._id);
      }
    };

    self.getActions = function (serviceId) {
      restService.get("services/" + serviceId + "/actions", null).then(function (actions) {
        self.actions = actions;
      });
    };

    self.saveServiceUserPassCredentials = function () {
      self.step = 3;
      self.getActions(self.selectedService._id);
    };

    self.selectAction = function (action) {
      self.selectedAction = action;
      if (self.selectedAction.inputs && self.selectedAction.inputs.length > 0) {
        self.step = 4;
      }
      else {
        self.saveActionToApplet(self.convertActionToInstance(action));
      }
    };

    self.saveInputs = function(){
      self.saveActionToApplet(self.convertActionToInstance(action));
    };

    self.convertActionToInstance = function(action){
      var payload = {};
      
      return {
        serviceAction = action._id,
        payload: payload
      }
    };

    self.saveActionToApplet = function(action){
      self.applet.inputs = self.applet.inputs || [];
      self.applet.inputs.push(action);
    };

    self.init = function () {
      self.getServices();
    };

    self.init();

  }]);