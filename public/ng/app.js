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
                                            "app_components",
                                            "ui.router"
                                          ]);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .otherwise("buy");

  $stateProvider
    .state("buy", {
      url: "/buy",
      templateUrl: "/ng/templates/buy.html"
    })
    .state("buyList", {
      url: "/list",
      template: "<buy-list></buy-list>"
    })
    .state("sell", {
      url: "/sell",
      templateUrl: "/ng/templates/sell.html"
    })
    .state("sellList", {
      url: "/list",
      template: "<sell-list></sell-list>"
    })
});
