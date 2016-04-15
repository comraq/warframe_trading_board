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
                                            "app_components"
                                          ]);

app.config([ "$stateProvider",
             "$urlRouterProvider",
             function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .otherwise("/home");

  $stateProvider
    .state("root", {
      abstract: true,
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
      }]
    })
    .state("root.home", {
      url: "/home",
      template: "<home user='userSession'></home>",
      controller: [ "$scope", "userSession",
                    function($scope, userSession) {
        $scope.userSession = userSession;
      }]
    })
    .state("root.buylist", {
      url: "/list",
      template: "<buy-list user='userSession'></buy-list>",
      controller: [ "$scope", "userSession",
                    function($scope, userSession) {
        $scope.userSession = userSession;
      }]
    })
    .state("root.sell", {
      url: "/sell",
      templateUrl: "/ng/templates/sell.html"
    })
    .state("root.sell.list", {
      url: "/list",
      template: "<sell-list user='userSession'></sell-list>",
      controller: [ "$scope", "userSession",
                    function($scope, userSession) {
        $scope.userSession = userSession;
      }]
    })
}]);
