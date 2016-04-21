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
      params: {
        level: null
      },
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
      params: {
        level: "Mode"
      },
      template: "<mods" + " user='userSession'"
                        + " catmodel='categoryHierarchy'"
                        + " getmodelabel='getModeLabel'"
                        + "></mods>",
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
      }],
      ncyBreadcrumb: {
        label: "{{ getModeLabel() }}"
      }
    })
    .state("root.mods.mode.type", {
      url: "/:type",
      params: {
        level: "Type"
      },
      template: "<mods" + " user='userSession'"
                             + " catmodel='categoryHierarchy'"
                             + " getmodelabel='getModeLabel'"
                             + " gettypelabel='getTypeLabel'"
                             + "></mods>",
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
      }],
      ncyBreadcrumb: {
        label: "{{ getTypeLabel() }}"
      }
    })
    .state("root.mods.mode.type.companion", {
      url: "/:companion",
      params: {
        level: "Companion"
      },
      template: "<mods" + " user='userSession'"
                             + " catmodel='categoryHierarchy'"
                             + " getmodelabel='getModeLabel'"
                             + " gettypelabel='getTypeLabel'"
                             + " getcompanionlabel='getCompanionLabel'"
                             + "></mods>",
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
      }],
      ncyBreadcrumb: {
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
      console.log("state changed");
      console.log(toState);
      console.log(toParams);
      console.log(fromState);
      console.log(fromParams);
    }

    // Ensure that the next state gets passed the correct 'level' parameter
    // for modsView nested category select hierarchy
    if (toState.params.level !== undefined)
      toParams.level = toState.params.level;
  });
}]);
