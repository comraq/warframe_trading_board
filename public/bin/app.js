(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var controllers = require("./directives/controllers"),
    directives = require("./directives/directives");

var components = angular.module("app_components", ["ng"]);

for (var controllerName in controllers)
  components.controller(controllerName, controllers[controllerName]);

for (var directiveName in directives)
  components.directive(directiveName, directives[directiveName]);
      
var app = angular.module("warframeTrade", [
                                            "app_components",
                                            "ui.router"
                                          ]);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("buy");

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
    .state("signIn", {
      url: "/signIn",
      template: "Sign In Template Stub"
    })
});

},{"./directives/controllers":3,"./directives/directives":5}],2:[function(require,module,exports){
module.exports = function($scope) {
  this.scope = $scope;

  this.scope.posts = [
                       "Buy Post 1",
                       "Buy Post 2"
                     ];
};

},{}],3:[function(require,module,exports){
exports.buyListController =
  require("./buyList/buyListController.js");

exports.sellListController =
  require("./sellList/sellListController.js");

exports.customNavBarController =
  require("./customNavBar/customNavBarController.js");

},{"./buyList/buyListController.js":2,"./customNavBar/customNavBarController.js":4,"./sellList/sellListController.js":6}],4:[function(require,module,exports){
module.exports = function($scope) {
  // TODO: Controller Stub
  this.scope = $scope;

  this.scope.signedIn = false;
};

},{}],5:[function(require,module,exports){
exports.buyList = function() {
  return {
    restrict: "AE",
    controller: "buyListController",
    templateUrl: "/ng/directives/buyList/buyListView.html",
  };
};

exports.sellList = function() {
  return {
    restrict: "AE",
    controller: "sellListController",
    templateUrl: "/ng/directives/sellList/sellListView.html",
  };
};

exports.customNavBar = function() {
  return {
    restrict: "AE",
    controller: "customNavBarController",
    templateUrl: "/ng/directives/customNavBar/customNavBarView.html",
  };
};

},{}],6:[function(require,module,exports){
module.exports = function($scope) {
  this.scope = $scope;

  this.scope.posts = [
                       "Sell Post 1",
                       "Sell Post 2"
                     ];
};

},{}]},{},[1]);
