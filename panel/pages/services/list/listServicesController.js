angular.module('pablo')
  .controller('listServicesController', ["$scope", "$state", "restService", function ($scope, $state, restService) {
    var self = this;

    self.getServices = function(){
      restService.getServices().then(function(services){
        self.services = services;
      });
    };

    self.init = function(){
      self.getServices();
    };

    self.init();
    
  }]);