var controllers = require("./directives/controllers"),
    directives = require("./directives/directives"),
    services = require("./services/services");

var components = angular.module("app_components", ["ng"]);

for (var controllerName in controllers)
  components.controller(controllerName, controllers[controllerName]);

for (var directiveName in directives)
  components.directive(directiveName, directives[directiveName]);
      
for (var serviceName in services)
  components.service(serviceName, services[serviceName]);

var app = angular.module("warframeTrade", [
                                            "ngAnimate",
                                            "ngTouch",
                                            "ui.bootstrap",
                                            "ui.router",
                                            "ncy-angular-breadcrumb",
                                            "ngScrollable",
                                            "app_components"
                                          ]);

app.config([ "$stateProvider",
             "$urlRouterProvider",
             function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .otherwise("/home");

  $stateProvider
    .state("root", {
      template: "<custom-nav-bar" + " user='userSession'"
                                  + " catmodel='categoryHierarchy'"
                                  + "></custom-nav-bar>",
      resolve: {
        userSession: [
                       "userSessionService",
                       function(userSessionService) {
          return userSessionService.getUserSession();
        }],
        categoryHierarchy: [
                             "itemCategoryService",
                             function(itemCategoryService) {
          return itemCategoryService.getCategoryHierarchy();
        }]
      },
      controller: [ "$scope", "userSession", "categoryHierarchy",
                    function($scope, userSession, categoryHierarchy) {
        $scope.userSession = userSession;
        $scope.categoryHierarchy = categoryHierarchy;
      }],
      ncyBreadcrumb: {
        label: "Home"
      }
    })
    .state("root.home", {
      url: "/home",
      template: "<home user='userSession'></home>",
      controller: [ "$scope", "userSession",
                    function($scope, userSession) {
        $scope.userSession = userSession;
      }],
      ncyBreadcrumb: {
        skip: true
      }
    })
    .state("root.mods", {
      url: "/mods",
      template: "<mods" + " user='userSession'"
                        + " catmodel='categoryHierarchy'"
                        + "></mods>",
      controller: [ "$scope", "userSession", "categoryHierarchy",
                    function($scope, userSession, categoryHierarchy) {
        $scope.userSession = userSession;
        $scope.categoryHierarchy = categoryHierarchy;
      }],
      ncyBreadcrumb: {
        label: "Mods"
      }
    })
    .state("root.mods.mode", {
      url: "/:mode",
      template: "<mods-mode" + " user='userSession'"
                             + " catmodel='categoryHierarchy'"
                             + " getlabel='getBreadcrumbLabel'"
                             + "></mods-mode>",
      controller: [
                    "$scope",
                    "$stateParams",
                    "userSession",
                    "categoryHierarchy",
                    function($scope,
                             $stateParams,
                             userSession,
                             categoryHierarchy) {
        $scope.userSession = userSession;
        $scope.categoryHierarchy = categoryHierarchy;

        $scope.getBreadcrumbLabel = function() {
          return $stateParams.mode;
        };
      }],
      ncyBreadcrumb: {
        label: "{{ getBreadcrumbLabel() }}"
      }
    })
}]);

app.run([
          "$rootScope",
          "$state",
          "$stateParams",
          function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}]);
