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
      },
      {
        stateName: "dashboard.serviceActions",
        label: "Service Actions",
        url: "/serviceActions",
        abstract: true,
        showOnSidebar: true,
        template: "<ui-view/>",
        subRoutes: [
          {
            stateName: "dashboard.serviceActions.list",
            label: "List",
            url: "/list",
            templateUrl: "/asset/pages/serviceActions/list/listServiceActions.html",
            controller: "listServiceActionsController",
            controllerAs: "self",
            authenticate: true,
            showOnSidebar: true,
            lazyLoadFiles:
              {
                name: 'pablo',
                files: [
                  '/asset/pages/serviceActions/list/listServiceActionsController.js',
                  '/asset/components/services/restService.js'
                ]
              }
          },
          {
            stateName: "dashboard.serviceActions.create",
            label: "Create",
            url: "/create/:id",
            templateUrl: "/asset/pages/serviceActions/create/createServiceActions.html",
            controller: "createServiceActionsController",
            controllerAs: "self",
            authenticate: true,
            showOnSidebar: true,
            lazyLoadFiles:
              {
                name: 'pablo',
                files: [
                  '/asset/pages/serviceActions/create/createServiceActionsController.js',
                  '/asset/components/services/restService.js'
                ]
              }
          }
        ]
      },
      {
        stateName: "dashboard.applets",
        label: "Applets",
        url: "/applets",
        abstract: true,
        showOnSidebar: true,
        template: "<ui-view/>",
        subRoutes: [
          {
            stateName: "dashboard.applets.list",
            label: "List",
            url: "/list",
            templateUrl: "/asset/pages/applets/list/listApplets.html",
            controller: "listAppletsController",
            controllerAs: "self",
            authenticate: true,
            showOnSidebar: true,
            lazyLoadFiles:
              {
                name: 'pablo',
                files: [
                  '/asset/pages/applets/list/listAppletsController.js',
                  '/asset/components/services/restService.js'
                ]
              }
          },
          {
            stateName: "dashboard.applets.create",
            label: "Create",
            url: "/create/:id",
            templateUrl: "/asset/pages/applets/create/createApplets.html",
            controller: "createAppletsController",
            controllerAs: "self",
            authenticate: true,
            showOnSidebar: true,
            lazyLoadFiles:
              {
                name: 'pablo',
                files: [
                  '/asset/pages/applets/create/createAppletsController.js',
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