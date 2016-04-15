var controllers = require("./directives/controllers"),
    directives = require("./directives/directives"),
    services = require("./services/services");

var components = angular.module("app_components", ["ng"]);

for (var controllerName in controllers)
  components.controller(controllerName, controllers[controllerName]);

for (var directiveName in directives)
  components.directive(directiveName, directives[directiveName]);
      
for (var serviceName in services)
  components.factory(serviceName, services[serviceName]);

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
      template: "<custom-nav-bar user='userSession'></custom-nav-bar>",
      resolve: {
        userSession: [ "userSessionService",
                       function(userSessionService) {
          return userSessionService.getUserSession();
        }]
      },
      controller: [ "$scope", "userSession",
                    function($scope, userSession) {
        $scope.userSession = userSession;
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
      template: "<mods user='userSession'></mods>",
      controller: [ "$scope", "userSession",
                    function($scope, userSession) {
        $scope.userSession = userSession;
      }],
      ncyBreadcrumb: {
        label: "Mods"
      }
    })
}]);
