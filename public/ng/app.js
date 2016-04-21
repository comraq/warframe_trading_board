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
      url: "/home",
      views: {
        "": {
          template: "<root" + " user='userSession'"
                            + " catmodel='categoryHierarchy'>"
                            + "></root>",
          controller: [ "$scope", "userSession", "categoryHierarchy",
                        function($scope, userSession, categoryHierarchy) {
            $scope.userSession = userSession;
            $scope.categoryHierarchy = categoryHierarchy;
          }]
/*
          templateUrl: "/ng/root.html",
          controller: [
                        "$scope",
                        "$state",
                        "userSession",
                        "categoryHierarchy",
                        function($scope,
                                 $state,
                                 userSession,
                                 categoryHierarchy) {
                        $scope.userSession = userSession;
                        $scope.categoryHierarchy = categoryHierarchy;

                        $scope.ctrl = this;
                        this.rootState = function rootState() {
                          return $state.current.name == "root";
                        };

                        console.log("inside root view controller");
                        console.log($scope);
          }]
*/
        },
        "home@root": {
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
      }],
      ncyBreadcrumb: {
        label: "{{ getModeLabel() }}"
      }
    })
    .state("root.mods.type", {
      url: "/:mode/:type",
      params: {
        level: "Type"
      },
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
      }],
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
      template: "<mods-hierarchy" + " user='userSession'"
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
      }],
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

    // Ensure that the next state gets passed the correct 'level' stateParam
    // for modsHierarchyView
    if (toState.params !== undefined  && toState.params.level !== undefined)
      toParams.level = toState.params.level;
  });
}]);
