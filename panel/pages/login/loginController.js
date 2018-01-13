angular.module('pablo')
  .controller('loginController', function ($scope, restService) {
    var self = this;

    self.doLogin = function () {
      restService.login({
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