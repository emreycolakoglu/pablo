angular.module("pablo").controller("createAppletsController", [
  "$scope",
  "$state",
  "restService",
  "authService",
  "$q",
  function($scope, $state, restService, authService, $q) {
    var self = this;
    self.applet = {
      name: "",
      interval: 3600,
      owner: authService.user._id,
      actions: []
    };
    self.services = [];
    self.selectedService = {};
    self.selectedAction = {};
    self.step = 0;

    self.saveApplet = function() {
      self.step = 1;
    };

    self.getServices = function() {
      restService.get("services", null).then(function(services) {
        self.services = services;
      });
    };

    self.selectService = function(service) {
      self.selectedService = service;
      if (self.selectedService.requireAuth) {
        self.getServiceInstances(self.selectedService._id);
        self.step = 2;
      } else {
        self.step = 3;
        self.getActions(self.selectedService._id);
      }
    };

    self.getActions = function(serviceId) {
      restService
        .get("services/" + serviceId + "/actions", null)
        .then(function(actions) {
          self.actions = actions;
        });
    };

    self.getServiceInstances = function(serviceId){
      restService
      .get("services/" + serviceId + "/instances", null)
      .then(function(instances){
        self.serviceInstances = instances;
      });
    }

    self.saveServiceUserPassCredentials = function() {
      self.step = 3;
      self.getActions(self.selectedService._id);
    };

    self.selectAction = function(action) {
      self.selectedAction = action;
      if (self.selectedAction.inputs && self.selectedAction.inputs.length > 0) {
        self.step = 4;
      } else {
        self.saveActionToApplet(self.convertActionToInstance(action));
      }
    };

    self.saveInputs = function() {
      self.saveActionToApplet(
        self.convertActionToInstance(self.selectedAction)
      );
      self.selectedAction = undefined;
      self.step = 1;
    };

    self.convertActionToInstance = function(action) {
      return {
        serviceAction: action,
        inputs: action.inputs
      };
    };

    self.saveActionToApplet = function(action) {
      self.applet.actions = self.applet.actions || [];
      if (self.tempAuthData) {
        action.serviceAction.auth = angular.copy(self.tempAuthData);
        self.tempAuthData = undefined;
      }
      else if(self.tempServiceInstance){
        action.serviceInstance = angular.copy(self.tempServiceInstance);
        self.tempServiceInstance = undefined;
      }
      self.applet.actions.push(action);
    };

    self.selectExistingServiceInstance = function(serviceInstance){
      self.tempServiceInstance = angular.copy(serviceInstance);
      self.getActions(self.selectedService._id);
      self.step = 3;
    };

    self.save = function() {
      restService
        .post("applets", {
          name: self.applet.name,
          interval: self.applet.interval,
          inProgress: false,
          owner: self.applet.owner
        })
        .then(function(appletCreateResult) {
          console.log("applet created", appletCreateResult);
          self.applet.actions.map(function(action, index) {
            //bagladigi hesaplari yarat
            if(action.serviceInstance){
              restService.post("serviceActionInstances", {
                serviceAction: action.serviceAction._id,
                serviceInstance: action.serviceInstance._id,
                applet: appletCreateResult._id,
                inputs: action.serviceAction.inputs,
                order: index
              }).then(function(serviceActionInstanceCreateResult){
                window.toastr.success(action.name + " created");
              });
            }
            else{
              restService
              .post("serviceInstances", {
                serviceType: action.serviceAction.service,
                owner: self.applet.owner,
                accessToken: undefined,
                refreshToken: undefined,
                username: action.serviceAction.auth
                  ? action.serviceAction.auth.username
                  : undefined,
                password: action.serviceAction.auth
                  ? action.serviceAction.auth.password
                  : undefined,
                endpoint: action.serviceAction.auth
                  ? action.serviceAction.auth.endpoint
                  : undefined
              })
              .then(function(serviceInstanceCreateResult) {
                //o servisin aksiyonunu yarat
                return restService.post("serviceActionInstances", {
                  serviceAction: action.serviceAction._id,
                  serviceInstance: serviceInstanceCreateResult._id,
                  applet: appletCreateResult._id,
                  inputs: action.serviceAction.inputs,
                  order: index
                });
              }).then(function(serviceActionInstanceCreateResult){
                window.toastr.success(action.name + " created");
              });
            }
          });
        })
        .catch(function(error) {
          window.toastr.error(error);
        });
    };

    self.reset = function() {
      self.applet = {
        name: "",
        interval: 3600,
        owner: authService.user._id,
        actions: []
      };
      self.services = [];
      self.selectedService = {};
      self.selectedAction = {};
      self.step = 0;
      self.init();
    };

    self.init = function() {
      self.getServices();
    };

    self.init();
  }
]);
