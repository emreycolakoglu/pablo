(function () {
  'use strict';

  angular
    .module('pablo')
    .provider('routeList', routeList);

  function routeList() {
    this.routes = [];

    this.routes.push(
      {
        stateName: "login",
        url: "/login",
        controller: "loginController",
        controllerAs: "self",
        templateUrl: "/asset/pages/login/login.html",
        authenticate: false,
        lazyLoadFiles: {
          name: 'pablo',
          files: [
            '/asset/pages/login/loginController.js',
            '/asset/components/services/restService.js'
          ]
        },
        showOnSidebar: false
      },
      {
        stateName: "register",
        url: '/register',
        controller: 'registerController',
        controllerAs: 'self',
        templateUrl: '/asset/pages/register/register.html',
        authenticate: false,
        lazyLoadFiles: {
          name: 'pablo',
          files: [
            '/asset/pages/register/registerController.js',
            '/asset/components/services/restService.js'
          ]
        }
      },
      {
        stateName: "dashboard",
        url: "",
        abstract: true,
        controller: "rootController",
        controllerAs: "rootVm",
        templateUrl: "/asset/pages/index/layout.html",
        lazyLoadFiles: {
          name: 'pablo',
          files: [
            '/asset/pages/index/rootController.js'
          ]
        }
      },
      {
        stateName: "dashboard.index",
        label: "Dashboard",
        url: "/",
        templateUrl: "/asset/pages/index/index.html",
        controller: "indexController",
        controllerAs: "self",
        authenticate: true,
        showOnSidebar: true,
        lazyLoadFiles: {
          name: 'pablo',
          files: [
            '/asset/pages/index/indexController.js'
          ]
        }
      },
      {
        stateName: "dashboard.services",
        label: "Services",
        url: "/services",
        abstract: true,
        showOnSidebar: true,
        template: "<ui-view/>",
        subRoutes: [
          {
            stateName: "dashboard.services.list",
            label: "List",
            url: "/list",
            templateUrl: "/asset/pages/services/list/listServices.html",
            controller: "listServicesController",
            controllerAs: "self",
            authenticate: true,
            showOnSidebar: true,
            lazyLoadFiles:
              {
                name: 'pablo',
                files: [
                  '/asset/pages/services/list/listServicesController.js',
                  '/asset/components/services/restService.js'
                ]
              }
          },
          {
            stateName: "dashboard.services.create",
            label: "Create",
            url: "/create/:id",
            templateUrl: "/asset/pages/services/create/createServices.html",
            controller: "createServicesController",
            controllerAs: "self",
            authenticate: true,
            showOnSidebar: true,
            lazyLoadFiles:
              {
                name: 'pablo',
                files: [
                  '/asset/pages/services/create/createServicesController.js',
                  '/asset/components/services/restService.js'
                ]
              }
          }
        ]
      });



    this.$get = function () {
      return this.routes;
    };
  }
})();