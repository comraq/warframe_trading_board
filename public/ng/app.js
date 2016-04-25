var controllers = require("./directives/controllers"),
    directives = require("./directives/directives"),
    services = require("./services/services"),
    debug = false;

var components = angular.module("app_components", ["ng"]);

for (var controllerName in controllers)
  components.controller(controllerName, controllers[controllerName]);

for (var directiveName in directives)
  components.directive(directiveName, directives[directiveName]);
      
for (var serviceName in services)
  components.service(serviceName, services[serviceName]);

var app = angular.module("warframeTrade", [
                                            require("angular-animate"),
                                            require("angular-touch"),
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
      url: "/home",
      views: {
        "": { template: "<root></root>" },
        "navbar@root": {
          template: "<custom-nav-bar" + " user='userSession'"
                                      + " catmodel='categoryHierarchy'>"
                                      + "></custom-nav-bar>",
          controller: [ "$scope", "userSession", "categoryHierarchy",
                        function($scope, userSession, categoryHierarchy) {
            $scope.userSession = userSession;
            $scope.categoryHierarchy = categoryHierarchy;
          }]
        },
        "body@root": {
          template: "<home" + " user='userSession'"
                            + " catmodel='categoryHierarchy'>"
                            + "></home>",
          controller: [ "$scope", "userSession", "categoryHierarchy",
                        function($scope, userSession, categoryHierarchy) {
            $scope.userSession = userSession;
            $scope.categoryHierarchy = categoryHierarchy;
          }]
        }
      },
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
      ncyBreadcrumb: {
        label: "Home"
      }
    })
    .state("root.mods", {
      url: "/mods",
      views: {
        "breadcrumb": { template: "<div ncy-breadcrumb></div>" },
        "body": {
          templateUrl: "/ng/templates/root-mods-body-template.html"
        },
        "hierarchy@root.mods": {
          template: "<mods-hierarchy" + " user='userSession'"
                                      + " catmodel='categoryHierarchy'"
                                      + "></mods-hierarchy>",
          controller: [ "$scope", "userSession", "categoryHierarchy",
                        function($scope, userSession, categoryHierarchy) {
            $scope.userSession = userSession;
            $scope.categoryHierarchy = categoryHierarchy;
          }]
        }
      },
      ncyBreadcrumb: {
        label: "Mods"
      }
    })
    .state("root.mods.mode", {
      url: "/:mode",
      params: {
        level: "Mode"
      },
      views: {
        "hierarchy": {
          template: "<mods-hierarchy" + " user='userSession'"
                                      + " catmodel='categoryHierarchy'"
                                      + " getmodelabel='getModeLabel'"
                                      + "></mods-hierarchy>",
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
 
            $scope.getModeLabel = function() {
              return $stateParams.mode;
            };
          }]
        },
        "items": {
          controller: [ "$scope", function($scope) {
            // Must explicitly set breadcrumb ignore for multiview scopes
            $scope.ncyBreadcrumbIgnore = true;
          }]
        }
      },
      ncyBreadcrumb: {
        label: "{{ getModeLabel() }}"
      }
    })
    .state("root.mods.type", {
      url: "/:mode/:type",
      params: {
        level: "Type"
      },
      views: {
        "hierarchy": {
          template: "<mods-hierarchy" + " user='userSession'"
                                      + " catmodel='categoryHierarchy'"
                                      + " getmodelabel='getModeLabel'"
                                      + " gettypelabel='getTypeLabel'"
                                      + "></mods-hierarchy>",
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

            $scope.getModeLabel = function() {
              return $stateParams.mode;
            };

            $scope.getTypeLabel = function() {
              return $stateParams.type;
            };
          }]
        },
        "items": {
          template: "<mods-items"
                      + " user='userSession'"
                      + " catmodel='categoryHierarchy'"
                      + "></mods-items>",
          controller: [
                        "$scope",
                        "userSession",
                        "categoryHierarchy",
                        function($scope,
                                 userSession,
                                 categoryHierarchy) {
            $scope.userSession = userSession;
            $scope.categoryHierarchy = categoryHierarchy;

            // Must explicitly set breadcrumb ignore for multiview scopes
            $scope.ncyBreadcrumbIgnore = true;
          }]
        }
      },
      ncyBreadcrumb: {
        parent: "root.mods.mode",
        label: "{{ getTypeLabel() }}"
      }
    })
    .state("root.mods.companion", {
      url: "/:mode/:type/:companion",
      params: {
        level: "Companion"
      },
      views: {
        "hierarchy": {
          template: "<mods-hierarchy"
                      + " user='userSession'"
                      + " catmodel='categoryHierarchy'"
                      + " getmodelabel='getModeLabel'"
                      + " gettypelabel='getTypeLabel'"
                      + " getcompanionlabel='getCompanionLabel'"
                      + "></mods-hierarchy>",
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
 
            $scope.getModeLabel = function() {
              return $stateParams.mode;
            };

            $scope.getTypeLabel = function() {
              return $stateParams.type;
            };

            $scope.getCompanionLabel = function() {
              return $stateParams.companion;
            };
          }]
        },
        "items": {
          template: "<mods-items"
                      + " user='userSession'"
                      + " catmodel='categoryHierarchy'"
                      + "></mods-items>",
          controller: [
                        "$scope",
                        "userSession",
                        "categoryHierarchy",
                        function($scope,
                                 userSession,
                                 categoryHierarchy) {
            $scope.userSession = userSession;
            $scope.categoryHierarchy = categoryHierarchy;

            // Must explicitly set breadcrumb ignore for multiview scopes
            $scope.ncyBreadcrumbIgnore = true;
          }]
        }
      },
      ncyBreadcrumb: {
        parent: "root.mods.type",
        label: "{{ getCompanionLabel() }}"
      }
    })
}]);

app.run([
          "$rootScope",
          "$state",
          "$stateParams",
          "$urlRouter",
          function ($rootScope, $state, $stateParams, $urlRouter) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  $rootScope.$on("$stateChangeStart", function(evt, toState, toParams,
                                               fromState, fromParams) {
    if (debug) {
      console.log("state change start:");
      console.log("from state:");
      console.log(fromState);
      console.log(fromParams);
      console.log("to state:");
      console.log(toState);
      console.log(toParams);
      console.log("\n\n\n");
    }
  });
}]);
