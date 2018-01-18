(function () {
  'use strict';

  angular
    .module('pablo')
    .directive('listItem', listItem);

  function listItem() {
    // Usage:
    //
    // Creates:
    //
    var directive = {
      bindToController: true,
      controller: listItemController,
      controllerAs: 'vm',
      templateUrl: "/asset/components/listItem/listItem.html",
      restrict: 'A',
      replace: true,
      scope: {
        listItem: '='
      }
    };
    return directive;
  }

  function listItemController($scope) {
  }
})();