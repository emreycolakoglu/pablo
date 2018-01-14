angular.module('pablo')
  .controller('registerController', function ($scope, restService) {
    var self = this;

    self.doLogin = function () {
      restService.register({
        email: self.email,
        password: self.password
      }).then(function(result){
        // TODO redirect to insides
      }).catch(function(error){
        toastr.error(error.data.message);
      });
    }

    self.test = "emre";
  });