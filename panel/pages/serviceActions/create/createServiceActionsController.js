angular.module('pablo')
  .controller('createServiceActionsController', ["$scope", "$state", "restService", "$stateParams", "$uibModal", function ($scope, $state, restService, $stateParams, $uibModal) {
    var self = this;
    self.request = {};
    self.inputTypes = [{
      value: 1,
      label: "Text"
    }, {
      value: 2,
      label: "Number"
    },{
      value: 3,
      label: "Array"
    }];
    self.modalInstance;

    self.openTypePopup = function (edit, container) {
      self.modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'addInputTypeModal.html',
        controller: ["$scope", "$uibModalInstance", "item", "inputTypes", function ($scope, $uibModalInstance, item, inputTypes) {
          var modal = this;
          modal.inputTypes = inputTypes;
          modal.request = item || {};
          modal.save = function () {
            $uibModalInstance.close(modal.request);
          };
          modal.close = function () {
            $uibModalInstance.dismiss('cancel');
          };
        }],
        controllerAs: 'modal',
        resolve: {
          item: function () {
            return edit;
          },
          inputTypes: function () {
            return self.inputTypes
          }
        }
      })

      self.modalInstance.result.then(function (result) {
        if (container == "inputs" && !edit) {
          self.request.inputs = self.request.inputs ||  [];
          self.request.inputs.push(result);
        }
        else if (container == "outputs" && !edit) {
          self.request.outputs = self.request.outputs ||  [];
          self.request.outputs.push(result);
        }
      }, function () {
        console.log('modal-component dismissed at: ' + new Date());
      });
    }

    self.deleteInputType = function (item, container) {
      if (container == "inputs" && item) {
        self.request.inputs = self.request.inputs ||  [];
        self.request.inputs.splice(self.request.inputs.indexOf(item), 1);
      }
      else if (container == "outputs" && item) {
        self.request.outputs = self.request.outputs ||  [];
        self.request.outputs.splice(self.request.outputs.indexOf(item), 1);
      }
    }

    self.save = function () {
      if ($stateParams.id) {
        restService.patch("serviceActions/" + $stateParams.id, self.request).then(function (result) {
          window.toastr.success("Success");
          self.reset();
          $state.go($state.$current.parent.self.name + '.list');
        }).catch(function (error) {
          window.toastr.error(error.message);
        });
      }
      else {
        restService.post("serviceActions", self.request).then(function (result) {
          window.toastr.success("Success");
          self.reset();
          $state.go($state.$current.parent.self.name + '.list');
        }).catch(function (error) {
          window.toastr.error(error.message || "Error");
        });
      }
    };

    self.reset = function () {
      self.request = {};
    };

    self.init = function () {
      restService.get("services", null).then(function (services) {
        self.services = services;
      });
      if ($stateParams.id) {
        restService.get("serviceActions/" + $stateParams.id, null).then(function (result) {
          self.request = result;
        }).catch(function (error) {
          window.toastr.error("Error");
        })
      }
    }

    self.init();

  }]);