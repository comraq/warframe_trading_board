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
                                            "app_components",
                                            "ui.router"
                                          ]);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .otherwise("/buy");

  $stateProvider
    .state("navbar", {
      abstract: true,
      template: "<custom-nav-bar user='userSession'></custom-nav-bar>",
      resolve: {
        userSession: function(userSessionService) {
          return userSessionService.getUserSession();
        }
      },
      controller: function($scope, userSession) {
        $scope.userSession = userSession;
      }
    })
    .state("navbar.buy", {
      url: "/buy",
      templateUrl: "/ng/templates/buy.html"
    })
    .state("navbar.buy.list", {
      url: "/list",
      template: "<buy-list user='userSession'></buy-list>",
      controller: function($scope, userSession) {
        $scope.userSession = userSession;
      }
    })
    .state("navbar.sell", {
      url: "/sell",
      templateUrl: "/ng/templates/sell.html"
    })
    .state("navbar.sell.list", {
      url: "/list",
      template: "<sell-list user='userSession'></sell-list>",
      controller: function($scope, userSession) {
        $scope.userSession = userSession;
      }
    })
});
